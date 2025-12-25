// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const lang = currentLang || 'ar';
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();
            
            if (!name || !email || !phone || !subject || !message) {
                showContactMessage(translations[lang].alertFillRequired || 'Please fill in all fields', 'error');
                return;
            }
            
            // Save to Firebase
            try {
                const contactData = {
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString(),
                    status: 'new'
                };
                
                // Save to Firestore
                if (typeof firebase !== 'undefined' && firebase.firestore) {
                    const db = firebase.firestore();
                    await db.collection('contact_messages').add(contactData);
                }
                
                // Show success message
                showContactMessage(translations[lang].contactFormSuccess || 'Message sent successfully!', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error saving contact message:', error);
                showContactMessage(translations[lang].contactFormError || 'Error sending message. Please try again.', 'error');
            }
        });
    }
});

function showContactMessage(message, type) {
    const messageDiv = document.getElementById('contactFormMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'form-message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}



