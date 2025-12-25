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
    
    // Display timeline
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    const statusOrder = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const statusLabels = {
        'pending': translations[lang].statusPending,
        'picked_up': translations[lang].statusPickedUp,
        'in_transit': translations[lang].statusInTransit,
        'out_for_delivery': translations[lang].statusOutForDelivery,
        'delivered': translations[lang].statusDelivered,
        'exception': translations[lang].statusException
    };
    
    const completedStatuses = shipment.statusHistory.map(s => s.status);
    const currentStatus = lastStatus.status;
    
    statusOrder.forEach((status, index) => {
        const isCompleted = completedStatuses.includes(status);
        const isActive = status === currentStatus;
        
        if (isCompleted || isActive) {
            const statusItem = shipment.statusHistory.find(s => s.status === status);
            if (statusItem) {
                const item = document.createElement('div');
                item.className = `timeline-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
                
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
                        <h4>${statusLabels[status] || status}</h4>
                        <p><strong>${translations[lang].location}:</strong> ${statusItem.location}</p>
                        <p><strong>${translations[lang].date}:</strong> ${formattedDate}</p>
                        ${statusItem.notes ? `<p><strong>${translations[lang].notes}:</strong> ${statusItem.notes}</p>` : ''}
                    </div>
                `;
                timeline.appendChild(item);
            }
        }
    });
    
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
        </div>
    `;
}

