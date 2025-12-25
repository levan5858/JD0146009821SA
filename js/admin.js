// Admin functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure auth.js is loaded
    setTimeout(function() {
        // Only initialize admin functionality if authenticated
        if (typeof isAuthenticated === 'function' && !isAuthenticated()) {
            return;
        }
        
        initializeAdmin();
    }, 100);
});

function initializeAdmin() {
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
        });
    });
    
    // Create shipment form
    const createForm = document.getElementById('createShipmentForm');
    if (createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createShipment();
        });
    }
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchShipment);
    }
    
    const searchInput = document.getElementById('searchTracking');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchShipment();
            }
        });
    }
    
    // Modal close
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('editShipmentModal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('editShipmentModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Update status form
    const updateForm = document.getElementById('updateStatusForm');
    if (updateForm) {
        updateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateShipmentStatus();
        });
    }
    
    // Set default datetime to now
    const dateTimeInput = document.getElementById('statusDateTime');
    if (dateTimeInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        dateTimeInput.value = now.toISOString().slice(0, 16);
    }
    
    // Load all shipments on manage tab
    loadAllShipments();
}

async function createShipment() {
    const lang = currentLang || 'ar';
    const trackingNumber = document.getElementById('newTrackingNumber').value.trim();
    const recipientName = document.getElementById('recipientName').value.trim();
    const recipientAddress = document.getElementById('recipientAddress').value.trim();
    const senderName = document.getElementById('senderName').value.trim();
    const senderAddress = document.getElementById('senderAddress').value.trim();
    const weight = document.getElementById('shipmentWeight').value;
    const description = document.getElementById('shipmentDescription').value.trim();
    
    if (!trackingNumber || !recipientName || !recipientAddress || !senderName || !senderAddress || !weight) {
        alert(translations[lang].alertFillRequired);
        return;
    }
    
    // Check if tracking number exists
    const exists = await database.trackingNumberExists(trackingNumber);
    if (exists) {
        alert(translations[lang].alertTrackingExists);
        return;
    }
    
    // Create new shipment
    const initialLocation = lang === 'ar' ? 'مركز التوزيع الرئيسي' : 'Main Distribution Center';
    const initialNotes = lang === 'ar' ? 'تم إنشاء الشحنة' : 'Shipment created';
    
    const shipment = {
        trackingNumber: trackingNumber,
        recipientName: recipientName,
        recipientAddress: recipientAddress,
        senderName: senderName,
        senderAddress: senderAddress,
        weight: weight,
        description: description,
        statusHistory: [{
            status: 'pending',
            location: initialLocation,
            dateTime: new Date().toISOString(),
            notes: initialNotes
        }],
        createdAt: new Date().toISOString()
    };
    
    // Save to database
    const saved = await database.saveShipment(shipment);
    
    if (saved) {
        alert(translations[lang].alertCreated);
        document.getElementById('createShipmentForm').reset();
        
        // Switch to manage tab and show the new shipment
        document.querySelector('[data-tab="manage"]').click();
        displayShipment(shipment);
    }
}

async function searchShipment() {
    const lang = currentLang || 'ar';
    const trackingNumber = document.getElementById('searchTracking').value.trim();
    if (!trackingNumber) {
        loadAllShipments();
        return;
    }
    
    const shipment = await database.getShipment(trackingNumber);
    const listDiv = document.getElementById('shipmentList');
    
    if (shipment) {
        listDiv.innerHTML = '';
        displayShipment(shipment);
    } else {
        listDiv.innerHTML = `<p style="text-align: center; padding: 2rem;">${translations[lang].notFound}</p>`;
    }
}

async function loadAllShipments() {
    const lang = currentLang || 'ar';
    const shipments = await database.getAllShipments();
    const listDiv = document.getElementById('shipmentList');
    
    if (Object.keys(shipments).length === 0) {
        listDiv.innerHTML = `<p style="text-align: center; padding: 2rem;">${translations[lang].noShipments}</p>`;
        return;
    }
    
    listDiv.innerHTML = '';
    
    // Sort by creation date (newest first)
    const sortedShipments = Object.values(shipments).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    sortedShipments.forEach(shipment => {
        displayShipment(shipment);
    });
}

function displayShipment(shipment) {
    const lang = currentLang || 'ar';
    const listDiv = document.getElementById('shipmentList');
    
    const statusMap = {
        'pending': translations[lang].statusPending,
        'picked_up': translations[lang].statusPickedUp,
        'in_transit': translations[lang].statusInTransit,
        'out_for_delivery': translations[lang].statusOutForDelivery,
        'delivered': translations[lang].statusDelivered,
        'exception': translations[lang].statusException
    };
    
    const lastStatus = shipment.statusHistory[shipment.statusHistory.length - 1];
    const statusText = statusMap[lastStatus.status] || lastStatus.status;
    const weightUnit = lang === 'ar' ? 'كجم' : 'kg';
    
    const item = document.createElement('div');
    item.className = 'shipment-item';
    item.innerHTML = `
        <div class="shipment-item-header">
            <h4>${shipment.trackingNumber}</h4>
            <button class="btn-edit" onclick="openEditModal('${shipment.trackingNumber}')">${translations[lang].editStatus}</button>
        </div>
        <p><strong>${translations[lang].currentStatus}</strong> ${statusText}</p>
        <p><strong>${translations[lang].sender}:</strong> ${shipment.senderName}</p>
        <p><strong>${translations[lang].recipient}:</strong> ${shipment.recipientName}</p>
        <p><strong>${translations[lang].weight}:</strong> ${shipment.weight} ${weightUnit}</p>
        <p><strong>${translations[lang].updateCount}</strong> ${shipment.statusHistory.length}</p>
    `;
    
    listDiv.appendChild(item);
}

function openEditModal(trackingNumber) {
    const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
    const shipment = shipments[trackingNumber];
    
    if (!shipment) return;
    
    // Store current tracking number for update
    document.getElementById('editShipmentModal').setAttribute('data-tracking', trackingNumber);
    document.getElementById('editShipmentModal').style.display = 'block';
    
    // Set default datetime to now
    const dateTimeInput = document.getElementById('statusDateTime');
    if (dateTimeInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        dateTimeInput.value = now.toISOString().slice(0, 16);
    }
}

async function updateShipmentStatus() {
    const lang = currentLang || 'ar';
    const modal = document.getElementById('editShipmentModal');
    const trackingNumber = modal.getAttribute('data-tracking');
    
    if (!trackingNumber) return;
    
    const shipment = await database.getShipment(trackingNumber);
    
    if (!shipment) return;
    
    const newStatus = document.getElementById('newStatus').value;
    const location = document.getElementById('statusLocation').value.trim();
    const dateTime = document.getElementById('statusDateTime').value;
    const notes = document.getElementById('statusNotes').value.trim();
    
    if (!location || !dateTime) {
        alert(translations[lang].alertFillRequired);
        return;
    }
    
    // Add new status
    shipment.statusHistory.push({
        status: newStatus,
        location: location,
        dateTime: new Date(dateTime).toISOString(),
        notes: notes
    });
    
    // Update in database
    const updated = await database.updateShipment(trackingNumber, shipment);
    
    if (updated) {
        alert(translations[lang].alertUpdated);
        modal.style.display = 'none';
        document.getElementById('updateStatusForm').reset();
        
        // Set default datetime to now for next use
        const dateTimeInput = document.getElementById('statusDateTime');
        if (dateTimeInput) {
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            dateTimeInput.value = now.toISOString().slice(0, 16);
        }
        
        // Refresh the list
        const searchInput = document.getElementById('searchTracking');
        if (searchInput.value.trim()) {
            searchShipment();
        } else {
            loadAllShipments();
        }
    }
}

// Make openEditModal available globally
window.openEditModal = openEditModal;

