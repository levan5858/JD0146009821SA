// ZIP code lookup functionality - Real-time API integration

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
    
    // Allow Enter key to search
    const zipSearchInput = document.getElementById('zipSearchInput');
    if (zipSearchInput) {
        zipSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    searchZip(searchTerm);
                }
            }
        });
    }
});

async function searchZip(searchTerm) {
    const lang = currentLang || 'ar';
    const resultsDiv = document.getElementById('zipResults');
    const errorDiv = document.getElementById('zipError');
    const resultsList = document.getElementById('zipResultsList');
    const searchInput = document.getElementById('zipSearchInput');
    
    // Hide previous results
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Show loading state
    if (resultsList) {
        resultsList.innerHTML = '<div class="loading-spinner">Searching...</div>';
        resultsDiv.style.display = 'block';
    }
    
    try {
        // Try multiple search strategies
        let results = [];
        
        // Strategy 1: Search by postal code directly (if it looks like a postal code)
        if (/^\d+[-\s]?\d*$/.test(searchTerm)) {
            results = await searchByPostalCode(searchTerm);
        }
        
        // Strategy 2: Search by place name (city/country)
        if (results.length === 0) {
            results = await searchByPlaceName(searchTerm);
        }
        
        // Strategy 3: Use GeoNames API for comprehensive search
        if (results.length === 0) {
            results = await searchGeoNames(searchTerm);
        }
        
        if (results.length === 0) {
            errorDiv.textContent = translations[lang].zipNotFound || 'No results found. Try a different search term.';
            errorDiv.style.display = 'block';
            resultsDiv.style.display = 'none';
            return;
        }
        
        // Display results
        displayZipResults(results);
        
    } catch (error) {
        console.error('Error searching ZIP codes:', error);
        errorDiv.textContent = translations[lang].zipSearchError || 'Error searching. Please try again.';
        errorDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
    }
}

async function searchByPostalCode(postalCode) {
    // Use GeoNames postal code search API
    const cleanCode = postalCode.replace(/[-\s]/g, '');
    const url = `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${encodeURIComponent(cleanCode)}&maxRows=50&username=demo`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.postalCodes && data.postalCodes.length > 0) {
            return data.postalCodes.map(item => ({
                code: item.postalCode,
                city: item.placeName,
                state: item.adminName1 || '',
                country: item.countryCode,
                countryName: getCountryNameFromCode(item.countryCode),
                lat: item.lat,
                lng: item.lng
            }));
        }
    } catch (error) {
        console.error('GeoNames API error:', error);
    }
    
    return [];
}

async function searchByPlaceName(placeName) {
    // Use GeoNames search API
    const url = `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(placeName)}&maxRows=50&username=demo&featureClass=P`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.geonames && data.geonames.length > 0) {
            return data.geonames
                .filter(item => item.fcode && (item.fcode.startsWith('PPL') || item.fcode.startsWith('ADM')))
                .map(item => ({
                    code: item.postalCodes ? item.postalCodes[0] : 'N/A',
                    city: item.name,
                    state: item.adminName1 || '',
                    country: item.countryCode,
                    countryName: item.countryName,
                    lat: item.lat,
                    lng: item.lng
                }));
        }
    } catch (error) {
        console.error('GeoNames search error:', error);
    }
    
    return [];
}

async function searchGeoNames(searchTerm) {
    // Comprehensive search using GeoNames
    const results = [];
    
    // Try postal code search
    const postalResults = await searchByPostalCode(searchTerm);
    results.push(...postalResults);
    
    // Try place name search
    const placeResults = await searchByPlaceName(searchTerm);
    results.push(...placeResults);
    
    // Remove duplicates
    const uniqueResults = [];
    const seen = new Set();
    
    results.forEach(result => {
        const key = `${result.city}-${result.country}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueResults.push(result);
        }
    });
    
    return uniqueResults.slice(0, 50); // Limit to 50 results
}

function getCountryNameFromCode(code) {
    const countryCodes = {
        'SA': 'Saudi Arabia', 'US': 'United States', 'GB': 'United Kingdom', 'AE': 'United Arab Emirates',
        'CA': 'Canada', 'AU': 'Australia', 'DE': 'Germany', 'FR': 'France', 'JP': 'Japan', 'CN': 'China',
        'IN': 'India', 'BR': 'Brazil', 'RU': 'Russia', 'ZA': 'South Africa', 'MX': 'Mexico', 'IT': 'Italy',
        'ES': 'Spain', 'KR': 'South Korea', 'TR': 'Turkey', 'ID': 'Indonesia', 'PL': 'Poland', 'NL': 'Netherlands',
        'BE': 'Belgium', 'SE': 'Sweden', 'CH': 'Switzerland', 'AT': 'Austria', 'NO': 'Norway', 'DK': 'Denmark',
        'FI': 'Finland', 'IE': 'Ireland', 'PT': 'Portugal', 'GR': 'Greece', 'CZ': 'Czech Republic', 'RO': 'Romania',
        'HU': 'Hungary', 'BG': 'Bulgaria', 'HR': 'Croatia', 'SK': 'Slovakia', 'SI': 'Slovenia', 'LT': 'Lithuania',
        'LV': 'Latvia', 'EE': 'Estonia', 'LU': 'Luxembourg', 'MT': 'Malta', 'CY': 'Cyprus', 'IS': 'Iceland'
    };
    return countryCodes[code] || code;
}

function displayZipResults(results) {
    const resultsDiv = document.getElementById('zipResults');
    const resultsList = document.getElementById('zipResultsList');
    
    if (!resultsList || !resultsDiv) return;
    
    resultsList.innerHTML = '';
    
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'zip-result-item';
        
        const locationParts = [item.city];
        if (item.state) locationParts.push(item.state);
        locationParts.push(item.countryName || item.country);
        
        resultItem.innerHTML = `
            <div class="zip-code">${item.code !== 'N/A' ? item.code : '—'}</div>
            <div class="zip-details">
                <strong>${item.city}</strong>
                <span>${locationParts.join(', ')}</span>
                ${item.lat && item.lng ? `<small class="zip-coords">📍 ${item.lat.toFixed(4)}, ${item.lng.toFixed(4)}</small>` : ''}
            </div>
        `;
        resultsList.appendChild(resultItem);
    });
    
    if (results.length >= 50) {
        const moreItem = document.createElement('div');
        moreItem.className = 'zip-result-item';
        moreItem.style.textAlign = 'center';
        moreItem.style.padding = '1rem';
        moreItem.style.fontStyle = 'italic';
        moreItem.style.color = 'var(--text-light)';
        moreItem.innerHTML = `Showing 50 results. Try a more specific search for better results.`;
        resultsList.appendChild(moreItem);
    }
    
    resultsDiv.style.display = 'block';
}

// Make function globally available
window.searchZip = searchZip;
