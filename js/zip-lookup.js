// ZIP code lookup functionality - Global postal codes database

document.addEventListener('DOMContentLoaded', function() {
    // Populate country dropdown
    const zipCountrySelect = document.getElementById('zipCountry');
    if (zipCountrySelect) {
        const countries = getAllCountries();
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            zipCountrySelect.appendChild(option);
        });
    }
    
    // Populate popular countries
    const popularCountriesGrid = document.getElementById('popularCountriesGrid');
    if (popularCountriesGrid) {
        const popularCountries = ['Saudi Arabia', 'United States', 'United Kingdom', 'United Arab Emirates', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'China', 'India', 'Brazil'];
        popularCountries.forEach(country => {
            const btn = document.createElement('button');
            btn.className = 'city-btn';
            btn.textContent = country;
            btn.onclick = () => {
                if (zipCountrySelect) zipCountrySelect.value = country;
                searchZip('');
            };
            popularCountriesGrid.appendChild(btn);
        });
    }
    
    const zipForm = document.getElementById('zipLookupForm');
    
    if (zipForm) {
        zipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('zipSearchInput').value.trim();
            const country = zipCountrySelect ? zipCountrySelect.value : '';
            searchZip(searchTerm, country);
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

function searchZip(searchTerm, country) {
    const lang = currentLang || 'ar';
    const resultsDiv = document.getElementById('zipResults');
    const errorDiv = document.getElementById('zipError');
    const resultsList = document.getElementById('zipResultsList');
    
    // Hide previous results
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    const searchLower = searchTerm.toLowerCase();
    const results = [];
    
    // If country is selected, search within that country
    if (country) {
        const cities = getCitiesForCountry(country);
        cities.forEach(city => {
            if (!searchTerm || city.toLowerCase().includes(searchLower)) {
                results.push({
                    code: 'N/A',
                    area: city,
                    city: city,
                    country: country
                });
            }
        });
    } else {
        // Search all countries
        const countries = getAllCountries();
        countries.forEach(countryName => {
            const cities = getCitiesForCountry(countryName);
            cities.forEach(city => {
                if (!searchTerm || 
                    city.toLowerCase().includes(searchLower) ||
                    countryName.toLowerCase().includes(searchLower)) {
                    results.push({
                        code: 'N/A',
                        area: city,
                        city: city,
                        country: countryName
                    });
                }
            });
        });
    }
    
    if (results.length === 0) {
        errorDiv.textContent = translations[lang].zipNotFound || 'No results found';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Limit results to 50 for performance
    const limitedResults = results.slice(0, 50);
    
    // Display results
    resultsList.innerHTML = '';
    limitedResults.forEach(item => {
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
    
    if (results.length > 50) {
        const moreItem = document.createElement('div');
        moreItem.className = 'zip-result-item';
        moreItem.style.textAlign = 'center';
        moreItem.style.padding = '1rem';
        moreItem.innerHTML = `<em>Showing 50 of ${results.length} results. Please refine your search.</em>`;
        resultsList.appendChild(moreItem);
    }
    
    resultsDiv.style.display = 'block';
}

// Make function globally available
window.searchZip = searchZip;
