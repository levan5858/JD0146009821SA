// Tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingNumber = urlParams.get('track');
    
    if (trackingNumber) {
        document.getElementById('trackingNumber').value = trackingNumber;
        trackShipment(trackingNumber);
    }
    
    const trackForm = document.getElementById('trackForm');
    if (trackForm) {
        trackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const number = document.getElementById('trackingNumber').value.trim();
            if (number) {
                await trackShipment(number);
            }
        });
    }
});

async function trackShipment(trackingNumber) {
    const resultDiv = document.getElementById('trackingResult');
    const errorDiv = document.getElementById('errorMessage');
    
    // Show loading state
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Get shipment from database
    const shipment = await database.getShipment(trackingNumber);
    
    if (shipment) {
        errorDiv.style.display = 'none';
        resultDiv.style.display = 'block';
        
        displayTrackingInfo(shipment);
    } else {
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'block';
    }
}

function displayTrackingInfo(shipment) {
    document.getElementById('resultTrackingNumber').textContent = shipment.trackingNumber;
    
    // Get status text from translations
    const lang = currentLang || 'ar';
    const statusMap = {
        'pending': translations[lang].statusPending,
        'picked_up': translations[lang].statusPickedUp,
        'in_transit': translations[lang].statusInTransit,
        'out_for_delivery': translations[lang].statusOutForDelivery,
        'delivered': translations[lang].statusDelivered,
        'exception': translations[lang].statusException
    };
    
    const lastStatus = shipment.statusHistory[shipment.statusHistory.length - 1];
    document.getElementById('statusText').textContent = statusMap[lastStatus.status] || lastStatus.status;
    
    // Display timeline with all statuses in chronological order
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    const statusLabels = {
        'pending': translations[lang].statusPending,
        'picked_up': translations[lang].statusPickedUp,
        'in_transit': translations[lang].statusInTransit,
        'out_for_delivery': translations[lang].statusOutForDelivery,
        'delivered': translations[lang].statusDelivered,
        'exception': translations[lang].statusException
    };
    
    // Sort status history by date (oldest first)
    const sortedHistory = [...shipment.statusHistory].sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
    });
    
    // Calculate progress percentage for animation
    const totalSteps = sortedHistory.length;
    let currentStep = 0;
    
    // Display all statuses in chronological order
    sortedHistory.forEach((statusItem, index) => {
        const isLast = index === sortedHistory.length - 1;
        const item = document.createElement('div');
        item.className = `timeline-item ${isLast ? 'active' : 'completed'}`;
        item.setAttribute('data-step', index);
        
        const date = new Date(statusItem.dateTime);
        const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
        const formattedDate = date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        item.innerHTML = `
            <div class="timeline-content">
                <h4>${statusLabels[statusItem.status] || statusItem.status}</h4>
                <p><strong>${translations[lang].location}:</strong> ${statusItem.location}</p>
                <p><strong>${translations[lang].date}:</strong> ${formattedDate}</p>
                ${statusItem.notes ? `<p><strong>${translations[lang].notes}:</strong> ${statusItem.notes}</p>` : ''}
            </div>
        `;
        timeline.appendChild(item);
        currentStep = index;
    });
    
    // Add animated green ship icon that moves along timeline
    if (sortedHistory.length > 0 && timeline.children.length > 0) {
        const shipIcon = document.createElement('div');
        shipIcon.className = 'ship-animation';
        
        // Create green ship SVG
        shipIcon.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5 L8 15 L8 25 L12 28 L12 32 L28 32 L28 28 L32 25 L32 15 Z" fill="#4a7c2a" stroke="#2d5016" stroke-width="1.5"/>
                <rect x="14" y="18" width="12" height="8" fill="#6b9f3d"/>
                <circle cx="16" cy="22" r="1.5" fill="#2d5016"/>
                <circle cx="24" cy="22" r="1.5" fill="#2d5016"/>
                <path d="M20 5 L20 15" stroke="#2d5016" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        
        timeline.appendChild(shipIcon);
        
        // Position ship at the last status item with smooth animation
        setTimeout(() => {
            const lastItem = timeline.children[timeline.children.length - 2]; // -2 because ship is now last child
            if (lastItem) {
                const timelineRect = timeline.getBoundingClientRect();
                const itemRect = lastItem.getBoundingClientRect();
                const itemTop = itemRect.top - timelineRect.top + (itemRect.height / 2) - 20;
                
                if (document.body.classList.contains('rtl')) {
                    shipIcon.style.right = '22px';
                } else {
                    shipIcon.style.left = '22px';
                }
                shipIcon.style.top = itemTop + 'px';
                shipIcon.classList.add('animate');
            }
        }, 500);
    }
    
    // Display shipment details
    const detailsDiv = document.getElementById('shipmentDetails');
    const weightUnit = lang === 'ar' ? 'كجم' : 'kg';
    detailsDiv.innerHTML = `
        <h4>${translations[lang].shipmentDetails}</h4>
        <div class="details-grid">
            <div class="detail-item">
                <strong>${translations[lang].sender}:</strong>
                ${shipment.senderName}<br>
                ${shipment.senderAddress}
            </div>
            <div class="detail-item">
                <strong>${translations[lang].recipient}:</strong>
                ${shipment.recipientName}<br>
                ${shipment.recipientAddress}
            </div>
            <div class="detail-item">
                <strong>${translations[lang].weight}:</strong>
                ${shipment.weight} ${weightUnit}
            </div>
            ${shipment.description ? `
            <div class="detail-item">
                <strong>${translations[lang].description}:</strong>
                ${shipment.description}
            </div>
            ` : ''}
            ${shipment.tags && shipment.tags.length > 0 ? `
            <div class="detail-item detail-item-full">
                <strong>${translations[lang].tags || 'Tags'}:</strong>
                <div class="tags-display">
                    ${shipment.tags.map(tag => `<span class="tag-badge-display">${tag}</span>`).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

