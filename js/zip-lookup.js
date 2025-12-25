// ZIP code lookup functionality for Saudi Arabia

// Saudi Arabia postal codes database (major cities and areas)
const saudiPostalCodes = {
    'Riyadh': [
        { code: '11564', area: 'Al Olaya', city: 'Riyadh' },
        { code: '11565', area: 'Al Olaya', city: 'Riyadh' },
        { code: '12211', area: 'Al Malaz', city: 'Riyadh' },
        { code: '12212', area: 'Al Malaz', city: 'Riyadh' },
        { code: '12611', area: 'Al Naseem', city: 'Riyadh' },
        { code: '12612', area: 'Al Naseem', city: 'Riyadh' },
        { code: '13241', area: 'Al Wurud', city: 'Riyadh' },
        { code: '13242', area: 'Al Wurud', city: 'Riyadh' },
        { code: '11464', area: 'Al Murabba', city: 'Riyadh' },
        { code: '11465', area: 'Al Murabba', city: 'Riyadh' },
        { code: '12382', area: 'Al Shumaisi', city: 'Riyadh' },
        { code: '12383', area: 'Al Shumaisi', city: 'Riyadh' },
        { code: '12813', area: 'Al Nakheel', city: 'Riyadh' },
        { code: '12814', area: 'Al Nakheel', city: 'Riyadh' }
    ],
    'Jeddah': [
        { code: '21421', area: 'Al Balad', city: 'Jeddah' },
        { code: '21422', area: 'Al Balad', city: 'Jeddah' },
        { code: '21423', area: 'Al Balad', city: 'Jeddah' },
        { code: '21431', area: 'Al Hamra', city: 'Jeddah' },
        { code: '21432', area: 'Al Hamra', city: 'Jeddah' },
        { code: '21461', area: 'Al Shati', city: 'Jeddah' },
        { code: '21462', area: 'Al Shati', city: 'Jeddah' },
        { code: '21463', area: 'Al Shati', city: 'Jeddah' },
        { code: '21577', area: 'Al Rawdah', city: 'Jeddah' },
        { code: '21578', area: 'Al Rawdah', city: 'Jeddah' },
        { code: '21589', area: 'Al Andalus', city: 'Jeddah' },
        { code: '21590', area: 'Al Andalus', city: 'Jeddah' }
    ],
    'Dammam': [
        { code: '32241', area: 'Al Faisaliyah', city: 'Dammam' },
        { code: '32242', area: 'Al Faisaliyah', city: 'Dammam' },
        { code: '32245', area: 'Al Aziziyah', city: 'Dammam' },
        { code: '32246', area: 'Al Aziziyah', city: 'Dammam' },
        { code: '32251', area: 'Al Corniche', city: 'Dammam' },
        { code: '32252', area: 'Al Corniche', city: 'Dammam' },
        { code: '32413', area: 'Al Firdous', city: 'Dammam' },
        { code: '32414', area: 'Al Firdous', city: 'Dammam' }
    ],
    'Mecca': [
        { code: '24231', area: 'Al Haram', city: 'Mecca' },
        { code: '24232', area: 'Al Haram', city: 'Mecca' },
        { code: '24241', area: 'Al Aziziyah', city: 'Mecca' },
        { code: '24242', area: 'Al Aziziyah', city: 'Mecca' },
        { code: '24331', area: 'Al Misfalah', city: 'Mecca' },
        { code: '24332', area: 'Al Misfalah', city: 'Mecca' }
    ],
    'Medina': [
        { code: '42311', area: 'Al Haram', city: 'Medina' },
        { code: '42312', area: 'Al Haram', city: 'Medina' },
        { code: '42321', area: 'Quba', city: 'Medina' },
        { code: '42322', area: 'Quba', city: 'Medina' },
        { code: '42331', area: 'Al Qiblatain', city: 'Medina' },
        { code: '42332', area: 'Al Qiblatain', city: 'Medina' }
    ],
    'Khobar': [
        { code: '34428', area: 'Al Corniche', city: 'Khobar' },
        { code: '34429', area: 'Al Corniche', city: 'Khobar' },
        { code: '34431', area: 'Al Aziziyah', city: 'Khobar' },
        { code: '34432', area: 'Al Aziziyah', city: 'Khobar' }
    ],
    'Taif': [
        { code: '26511', area: 'Al Shafa', city: 'Taif' },
        { code: '26512', area: 'Al Shafa', city: 'Taif' },
        { code: '26521', area: 'Al Hawiyah', city: 'Taif' },
        { code: '26522', area: 'Al Hawiyah', city: 'Taif' }
    ],
    'Abha': [
        { code: '61411', area: 'Al Naseem', city: 'Abha' },
        { code: '61412', area: 'Al Naseem', city: 'Abha' },
        { code: '61421', area: 'Al Sahab', city: 'Abha' },
        { code: '61422', area: 'Al Sahab', city: 'Abha' }
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
    
    // Search by city name, area name, or postal code
    Object.keys(saudiPostalCodes).forEach(city => {
        saudiPostalCodes[city].forEach(item => {
            if (item.code.includes(searchTerm) || 
                city.toLowerCase().includes(searchLower) ||
                item.area.toLowerCase().includes(searchLower)) {
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
                <span>${item.city}</span>
            </div>
        `;
        resultsList.appendChild(resultItem);
    });
    
    resultsDiv.style.display = 'block';
}

// Make function globally available
window.searchZip = searchZip;

