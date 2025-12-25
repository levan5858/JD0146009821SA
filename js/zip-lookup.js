// ZIP code lookup functionality - Global postal codes database

// Global postal codes database (major cities worldwide)
const globalPostalCodes = {
    // Saudi Arabia
    'Riyadh': [
        { code: '11564', area: 'Al Olaya', city: 'Riyadh', country: 'Saudi Arabia' },
        { code: '12211', area: 'Al Malaz', city: 'Riyadh', country: 'Saudi Arabia' },
        { code: '12611', area: 'Al Naseem', city: 'Riyadh', country: 'Saudi Arabia' }
    ],
    'Jeddah': [
        { code: '21421', area: 'Al Balad', city: 'Jeddah', country: 'Saudi Arabia' },
        { code: '21431', area: 'Al Hamra', city: 'Jeddah', country: 'Saudi Arabia' }
    ],
    // United States
    'New York': [
        { code: '10001', area: 'Manhattan', city: 'New York', country: 'USA' },
        { code: '10002', area: 'Lower East Side', city: 'New York', country: 'USA' },
        { code: '10004', area: 'Financial District', city: 'New York', country: 'USA' }
    ],
    'Los Angeles': [
        { code: '90001', area: 'South LA', city: 'Los Angeles', country: 'USA' },
        { code: '90012', area: 'Downtown', city: 'Los Angeles', country: 'USA' },
        { code: '90024', area: 'Westwood', city: 'Los Angeles', country: 'USA' }
    ],
    'Chicago': [
        { code: '60601', area: 'Loop', city: 'Chicago', country: 'USA' },
        { code: '60611', area: 'Gold Coast', city: 'Chicago', country: 'USA' }
    ],
    // United Kingdom
    'London': [
        { code: 'SW1A 1AA', area: 'Westminster', city: 'London', country: 'UK' },
        { code: 'EC1A 1BB', area: 'City of London', city: 'London', country: 'UK' },
        { code: 'W1K 6TF', area: 'Mayfair', city: 'London', country: 'UK' }
    ],
    'Manchester': [
        { code: 'M1 1AA', area: 'City Centre', city: 'Manchester', country: 'UK' },
        { code: 'M2 3AB', area: 'Deansgate', city: 'Manchester', country: 'UK' }
    ],
    // UAE
    'Dubai': [
        { code: '00000', area: 'Downtown', city: 'Dubai', country: 'UAE' },
        { code: '00000', area: 'Marina', city: 'Dubai', country: 'UAE' },
        { code: '00000', area: 'Business Bay', city: 'Dubai', country: 'UAE' }
    ],
    'Abu Dhabi': [
        { code: '00000', area: 'Al Markaziyah', city: 'Abu Dhabi', country: 'UAE' },
        { code: '00000', area: 'Al Khalidiyah', city: 'Abu Dhabi', country: 'UAE' }
    ],
    // Germany
    'Berlin': [
        { code: '10115', area: 'Mitte', city: 'Berlin', country: 'Germany' },
        { code: '10787', area: 'Tiergarten', city: 'Berlin', country: 'Germany' }
    ],
    'Frankfurt': [
        { code: '60311', area: 'Altstadt', city: 'Frankfurt', country: 'Germany' },
        { code: '60313', area: 'Innenstadt', city: 'Frankfurt', country: 'Germany' }
    ],
    // France
    'Paris': [
        { code: '75001', area: '1st Arrondissement', city: 'Paris', country: 'France' },
        { code: '75008', area: '8th Arrondissement', city: 'Paris', country: 'France' },
        { code: '75016', area: '16th Arrondissement', city: 'Paris', country: 'France' }
    ],
    // China
    'Beijing': [
        { code: '100000', area: 'Dongcheng', city: 'Beijing', country: 'China' },
        { code: '100010', area: 'Chaoyang', city: 'Beijing', country: 'China' }
    ],
    'Shanghai': [
        { code: '200000', area: 'Huangpu', city: 'Shanghai', country: 'China' },
        { code: '200020', area: 'Xuhui', city: 'Shanghai', country: 'China' }
    ],
    // Japan
    'Tokyo': [
        { code: '100-0001', area: 'Chiyoda', city: 'Tokyo', country: 'Japan' },
        { code: '100-0005', area: 'Marunouchi', city: 'Tokyo', country: 'Japan' }
    ],
    // Australia
    'Sydney': [
        { code: '2000', area: 'CBD', city: 'Sydney', country: 'Australia' },
        { code: '2001', area: 'The Rocks', city: 'Sydney', country: 'Australia' }
    ],
    'Melbourne': [
        { code: '3000', area: 'CBD', city: 'Melbourne', country: 'Australia' },
        { code: '3001', area: 'Docklands', city: 'Melbourne', country: 'Australia' }
    ],
    // Canada
    'Toronto': [
        { code: 'M5H 2N2', area: 'Financial District', city: 'Toronto', country: 'Canada' },
        { code: 'M5J 2T4', area: 'Entertainment District', city: 'Toronto', country: 'Canada' }
    ],
    'Vancouver': [
        { code: 'V6B 1A1', area: 'Downtown', city: 'Vancouver', country: 'Canada' },
        { code: 'V6C 1A4', area: 'Coal Harbour', city: 'Vancouver', country: 'Canada' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const zipForm = document.getElementById('zipLookupForm');
    
    if (zipForm) {
        zipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('zipSearchInput').value.trim();
            if (searchTerm) {
                searchZip(searchTerm);
            }
        });
    }
    
    // Set minimum date for pickup date
    const pickupDate = document.getElementById('pickupDate');
    if (pickupDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        pickupDate.min = tomorrow.toISOString().split('T')[0];
    }
});

function searchZip(searchTerm) {
    const lang = currentLang || 'ar';
    const resultsDiv = document.getElementById('zipResults');
    const errorDiv = document.getElementById('zipError');
    const resultsList = document.getElementById('zipResultsList');
    
    // Hide previous results
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    const searchLower = searchTerm.toLowerCase();
    const results = [];
    
    // Search by city name, area name, country, or postal code
    Object.keys(globalPostalCodes).forEach(city => {
        globalPostalCodes[city].forEach(item => {
            if (item.code.includes(searchTerm) || 
                city.toLowerCase().includes(searchLower) ||
                item.area.toLowerCase().includes(searchLower) ||
                (item.country && item.country.toLowerCase().includes(searchLower))) {
                results.push(item);
            }
        });
    });
    
    if (results.length === 0) {
        errorDiv.textContent = translations[lang].zipNotFound || 'No results found';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Display results
    resultsList.innerHTML = '';
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'zip-result-item';
        resultItem.innerHTML = `
            <div class="zip-code">${item.code}</div>
            <div class="zip-details">
                <strong>${item.area}</strong>
                <span>${item.city}, ${item.country}</span>
            </div>
        `;
        resultsList.appendChild(resultItem);
    });
    
    resultsDiv.style.display = 'block';
}

// Make function globally available
window.searchZip = searchZip;
