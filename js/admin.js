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
    
    // Modal close buttons
    const closeModals = document.querySelectorAll('.close-modal');
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            const statusModal = document.getElementById('editShipmentModal');
            const descModal = document.getElementById('editDescriptionModal');
            if (statusModal && statusModal.style.display !== 'none') {
                statusModal.style.display = 'none';
            }
            if (descModal && descModal.style.display !== 'none') {
                descModal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const statusModal = document.getElementById('editShipmentModal');
        const descModal = document.getElementById('editDescriptionModal');
        const historyModal = document.getElementById('viewStatusHistoryModal');
        if (e.target === statusModal) {
            statusModal.style.display = 'none';
        }
        if (e.target === descModal) {
            descModal.style.display = 'none';
        }
        if (e.target === historyModal) {
            historyModal.style.display = 'none';
        }
    });
    
    // Update status form
    const updateForm = document.getElementById('updateStatusForm');
    if (updateForm) {
        updateForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await updateShipmentStatus();
        });
    }
    
    // Update description form
    const updateDescForm = document.getElementById('updateDescriptionForm');
    if (updateDescForm) {
        updateDescForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await updateShipmentDescription();
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
            <div class="shipment-actions">
                <button class="btn-edit" onclick="openEditModal('${shipment.trackingNumber}')">${translations[lang].editStatus}</button>
                <button class="btn-edit-description" onclick="openEditDescriptionModal('${shipment.trackingNumber}')">${translations[lang].editDescription || 'Edit Description'}</button>
                <button class="btn-view-history" onclick="openStatusHistoryModal('${shipment.trackingNumber}')">${translations[lang].viewHistory || 'View History'}</button>
            </div>
        </div>
        <p><strong>${translations[lang].currentStatus}</strong> ${statusText}</p>
        <p><strong>${translations[lang].sender}:</strong> ${shipment.senderName}</p>
        <p><strong>${translations[lang].recipient}:</strong> ${shipment.recipientName}</p>
        <p><strong>${translations[lang].weight}:</strong> ${shipment.weight} ${weightUnit}</p>
        ${shipment.description ? `<p><strong>${translations[lang].description}:</strong> ${shipment.description}</p>` : ''}
        <p><strong>${translations[lang].updateCount}</strong> ${shipment.statusHistory.length}</p>
    `;
    
    listDiv.appendChild(item);
}

async function openStatusHistoryModal(trackingNumber) {
    const shipment = await database.getShipment(trackingNumber);
    
    if (!shipment) {
        alert('Shipment not found');
        return;
    }
    
    const lang = currentLang || 'ar';
    const statusMap = {
        'pending': translations[lang].statusPending,
        'picked_up': translations[lang].statusPickedUp,
        'in_transit': translations[lang].statusInTransit,
        'out_for_delivery': translations[lang].statusOutForDelivery,
        'delivered': translations[lang].statusDelivered,
        'exception': translations[lang].statusException
    };
    
    // Sort by date (oldest first)
    const sortedHistory = [...shipment.statusHistory].sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
    });
    
    const historyList = document.getElementById('statusHistoryList');
    historyList.innerHTML = '';
    
    if (sortedHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; padding: 2rem;">No status history</p>';
    } else {
        sortedHistory.forEach((statusItem, index) => {
            const date = new Date(statusItem.dateTime);
            const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
            const formattedDate = date.toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const historyItem = document.createElement('div');
            historyItem.className = 'status-history-item';
            historyItem.innerHTML = `
                <div class="status-history-content">
                    <div class="status-history-header">
                        <h4>${statusMap[statusItem.status] || statusItem.status}</h4>
                        <button class="btn-delete-status" onclick="deleteStatus('${trackingNumber}', ${index})" title="${translations[lang].deleteStatus || 'Delete'}">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 5 L15 15 M15 5 L5 15" stroke="#c62828" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <p><strong>${translations[lang].location}:</strong> ${statusItem.location}</p>
                    <p><strong>${translations[lang].date}:</strong> ${formattedDate}</p>
                    ${statusItem.notes ? `<p><strong>${translations[lang].notes}:</strong> ${statusItem.notes}</p>` : ''}
                </div>
            `;
            historyList.appendChild(historyItem);
        });
    }
    
    document.getElementById('viewStatusHistoryModal').setAttribute('data-tracking', trackingNumber);
    document.getElementById('viewStatusHistoryModal').style.display = 'block';
}

async function deleteStatus(trackingNumber, displayIndex) {
    const lang = currentLang || 'ar';
    
    if (!confirm(translations[lang].confirmDelete || 'Are you sure you want to delete this status?')) {
        return;
    }
    
    const shipment = await database.getShipment(trackingNumber);
    
    if (!shipment || !shipment.statusHistory || shipment.statusHistory.length === 0) {
        return;
    }
    
    // Sort by date to match the display order
    const sortedHistory = [...shipment.statusHistory].sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
    });
    
    // Get the status to delete
    const statusToDelete = sortedHistory[displayIndex];
    
    if (!statusToDelete) {
        return;
    }
    
    // Find and remove from original array by matching dateTime and status
    shipment.statusHistory = shipment.statusHistory.filter(status => {
        return !(status.dateTime === statusToDelete.dateTime && 
                 status.status === statusToDelete.status &&
                 status.location === statusToDelete.location);
    });
    
    // Ensure at least one status remains
    if (shipment.statusHistory.length === 0) {
        alert('Cannot delete the last status. Please add a new status first.');
        return;
    }
    
    try {
        const updated = await database.updateShipment(trackingNumber, shipment);
        
        if (updated) {
            alert(translations[lang].statusDeleted || 'Status deleted successfully!');
            // Refresh the modal
            await openStatusHistoryModal(trackingNumber);
            // Refresh the shipment list
            const searchInput = document.getElementById('searchTracking');
            if (searchInput && searchInput.value.trim()) {
                await searchShipment();
            } else {
                await loadAllShipments();
            }
        }
    } catch (error) {
        console.error('Error deleting status:', error);
        alert('Error deleting status: ' + error.message);
    }
}

function closeStatusHistoryModal() {
    document.getElementById('viewStatusHistoryModal').style.display = 'none';
}

async function openEditModal(trackingNumber) {
    // Get shipment from database
    const shipment = await database.getShipment(trackingNumber);
    
    if (!shipment) {
        console.error('Shipment not found:', trackingNumber);
        alert('Shipment not found');
        return;
    }
    
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
    
    if (!trackingNumber) {
        console.error('No tracking number found');
        return;
    }
    
    const shipment = await database.getShipment(trackingNumber);
    
    if (!shipment) {
        alert('Shipment not found');
        return;
    }
    
    // Ensure statusHistory exists
    if (!shipment.statusHistory) {
        shipment.statusHistory = [];
    }
    
    const newStatus = document.getElementById('newStatus').value;
    const location = document.getElementById('statusLocation').value.trim();
    const dateTime = document.getElementById('statusDateTime').value;
    const notes = document.getElementById('statusNotes').value.trim();
    
    if (!location || !dateTime) {
        alert(translations[lang].alertFillRequired);
        return;
    }
    
    // If going back to a previous status (like pending), require notes/explanation
    const lastStatus = shipment.statusHistory[shipment.statusHistory.length - 1];
    const statusOrder = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const lastIndex = statusOrder.indexOf(lastStatus.status);
    const newIndex = statusOrder.indexOf(newStatus);
    
    if (newIndex < lastIndex && !notes.trim()) {
        alert('يرجى إدخال سبب العودة إلى حالة سابقة / Please provide a reason for reverting to a previous status');
        return;
    }
    
    // Add new status (can be any status, including going back)
    shipment.statusHistory.push({
        status: newStatus,
        location: location,
        dateTime: new Date(dateTime).toISOString(),
        notes: notes || (newIndex < lastIndex ? 'Returned to previous status' : '')
    });
    
    // Update in database
    try {
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
            if (searchInput && searchInput.value.trim()) {
                await searchShipment();
            } else {
                await loadAllShipments();
            }
        } else {
            alert('Failed to update shipment. Please check console for errors.');
        }
    } catch (error) {
        console.error('Error updating shipment status:', error);
        alert('Error updating shipment: ' + error.message);
    }
}

async function openEditDescriptionModal(trackingNumber) {
    const shipment = await database.getShipment(trackingNumber);
    
    if (!shipment) {
        alert('Shipment not found');
        return;
    }
    
    document.getElementById('editDescriptionModal').setAttribute('data-tracking', trackingNumber);
    document.getElementById('editDescriptionText').value = shipment.description || '';
    document.getElementById('editDescriptionModal').style.display = 'block';
}

async function updateShipmentDescription() {
    const lang = currentLang || 'ar';
    const modal = document.getElementById('editDescriptionModal');
    const trackingNumber = modal.getAttribute('data-tracking');
    
    if (!trackingNumber) return;
    
    const shipment = await database.getShipment(trackingNumber);
    if (!shipment) return;
    
    const newDescription = document.getElementById('editDescriptionText').value.trim();
    shipment.description = newDescription;
    
    try {
        const updated = await database.updateShipment(trackingNumber, shipment);
        
        if (updated) {
            alert(translations[lang].alertUpdated || 'Description updated successfully!');
            modal.style.display = 'none';
            
            // Refresh the list
            const searchInput = document.getElementById('searchTracking');
            if (searchInput && searchInput.value.trim()) {
                await searchShipment();
            } else {
                await loadAllShipments();
            }
        }
    } catch (error) {
        console.error('Error updating description:', error);
        alert('Error updating description: ' + error.message);
    }
}

function closeEditModal() {
    document.getElementById('editShipmentModal').style.display = 'none';
}

function closeEditDescriptionModal() {
    document.getElementById('editDescriptionModal').style.display = 'none';
}

// Make functions available globally
window.openEditModal = openEditModal;
window.openEditDescriptionModal = openEditDescriptionModal;
window.openStatusHistoryModal = openStatusHistoryModal;
window.closeEditModal = closeEditModal;
window.closeEditDescriptionModal = closeEditDescriptionModal;
window.closeStatusHistoryModal = closeStatusHistoryModal;
window.deleteStatus = deleteStatus;

