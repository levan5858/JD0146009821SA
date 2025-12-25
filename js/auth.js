// Authentication system for Admin Panel

const ADMIN_CREDENTIALS = {
    username: 'WEALTHY',
    password: 'Wealth12##'
};

// Check if user is authenticated
function isAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Authenticate user
function authenticate(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        return true;
    }
    return false;
}

// Logout user
function logout() {
    sessionStorage.removeItem('adminAuthenticated');
    showLogin();
}

// Show login form
function showLogin() {
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    
    if (loginSection) loginSection.style.display = 'block';
    if (adminSection) adminSection.style.display = 'none';
    
    // Clear form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.reset();
    }
    
    // Clear error
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Show admin panel
function showAdmin() {
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    
    if (loginSection) loginSection.style.display = 'none';
    if (adminSection) adminSection.style.display = 'block';
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if already authenticated
    if (isAuthenticated()) {
        showAdmin();
    } else {
        showLogin();
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('loginError');
            const lang = currentLang || 'ar';
            
            if (authenticate(username, password)) {
                showAdmin();
            } else {
                // Show error message
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = translations[lang].loginError || 'Invalid username or password';
                }
            }
        });
    }
    
    // Handle logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }
});

// Make functions available globally
window.logout = logout;
window.isAuthenticated = isAuthenticated;

