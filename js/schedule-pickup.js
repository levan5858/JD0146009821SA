// Schedule pickup functionality
document.addEventListener('DOMContentLoaded', function() {
    const pickupForm = document.getElementById('pickupForm');
    
    // Set minimum date to tomorrow
    const pickupDate = document.getElementById('pickupDate');
    if (pickupDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        pickupDate.min = tomorrow.toISOString().split('T')[0];
    }
    
    if (pickupForm) {
        pickupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const lang = currentLang || 'ar';
            const name = document.getElementById('pickupName').value.trim();
            const phone = document.getElementById('pickupPhone').value.trim();
            const email = document.getElementById('pickupEmail').value.trim();
            const address = document.getElementById('pickupAddress').value.trim();
            const city = document.getElementById('pickupCity').value;
            const zipCode = document.getElementById('pickupZipCode').value.trim();
            const date = document.getElementById('pickupDate').value;
            const time = document.getElementById('pickupTime').value;
            const packageCount = parseInt(document.getElementById('pickupPackageCount').value);
            const weight = parseFloat(document.getElementById('pickupWeight').value);
            const instructions = document.getElementById('pickupInstructions').value.trim();
            const agreement = document.getElementById('pickupAgreement').checked;
            
            // Validation
            if (!name || !phone || !email || !address || !city || !date || !time || !packageCount || !weight) {
                showPickupMessage(translations[lang].alertFillRequired || 'Please fill in all required fields', 'error');
                return;
            }
            
            if (!agreement) {
                showPickupMessage(translations[lang].pickupAgreementRequired || 'Please agree to the terms and conditions', 'error');
                return;
            }
            
            // Validate date is not in the past
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showPickupMessage(translations[lang].pickupDateError || 'Pickup date cannot be in the past', 'error');
                return;
            }
            
            // Save to Firebase
            try {
                const pickupData = {
                    name: name,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    zipCode: zipCode,
                    date: date,
                    time: time,
                    packageCount: packageCount,
                    weight: weight,
                    instructions: instructions,
                    timestamp: new Date().toISOString(),
                    status: 'pending'
                };
                
                // Save to Firestore
                if (typeof firebase !== 'undefined' && firebase.firestore) {
                    const db = firebase.firestore();
                    await db.collection('pickup_requests').add(pickupData);
                }
                
                // Show success message
                showPickupMessage(translations[lang].pickupFormSuccess || 'Pickup scheduled successfully! We will contact you to confirm.', 'success');
                pickupForm.reset();
                
                // Reset minimum date
                if (pickupDate) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    pickupDate.min = tomorrow.toISOString().split('T')[0];
                }
                
            } catch (error) {
                console.error('Error saving pickup request:', error);
                showPickupMessage(translations[lang].pickupFormError || 'Error scheduling pickup. Please try again.', 'error');
            }
        });
    }
});

function showPickupMessage(message, type) {
    const messageDiv = document.getElementById('pickupFormMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'form-message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

