// Main page functionality
document.addEventListener('DOMContentLoaded', function() {
    const trackForm = document.getElementById('trackForm');
    
    if (trackForm) {
        trackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingNumber = document.getElementById('trackingNumber').value.trim();
            if (trackingNumber) {
                window.location.href = `tracking.html?track=${encodeURIComponent(trackingNumber)}`;
            }
        });
    }
});



