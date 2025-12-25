// Main page functionality
document.addEventListener('DOMContentLoaded', function() {
    const trackForm = document.getElementById('trackForm');
    
    if (trackForm) {
        trackForm.addEventListener('submit', function(e) {
            const trackingNumber = document.getElementById('trackingNumber').value.trim().toUpperCase();
            if (trackingNumber) {
                // Update the input value to uppercase before form submission
                document.getElementById('trackingNumber').value = trackingNumber;
                // Let the form submit naturally to /tracking (form action is already set correctly)
            }
        });
    }
});





