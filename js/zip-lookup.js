// ZIP code lookup functionality - Real-time API integration with multiple fallbacks

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
    
    // Hide previous results
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Show loading state
    if (resultsList) {
        resultsList.innerHTML = '<div class="loading-spinner">Searching worldwide database...</div>';
        resultsDiv.style.display = 'block';
    }
    
    try {
        let results = [];
        
        // Strategy 1: Try Zippopotam.us API (free, no auth needed) for postal codes
        if (/^\d{3,10}$/.test(searchTerm.replace(/[-\s]/g, ''))) {
            results = await searchZippopotam(searchTerm);
        }
        
        // Strategy 2: Use GeoNames API for place names
        if (results.length === 0) {
            results = await searchGeoNamesPlace(searchTerm);
        }
        
        // Strategy 3: Use GeoNames postal code search
        if (results.length === 0) {
            results = await searchGeoNamesPostal(searchTerm);
        }
        
        // Strategy 4: Fallback to our local database
        if (results.length === 0) {
            results = searchLocalDatabase(searchTerm);
        }
        
        if (results.length === 0) {
            errorDiv.innerHTML = `
                <p>${translations[lang].zipNotFound || 'No results found.'}</p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">Try searching with: city name, state/province, country, or postal code</p>
            `;
            errorDiv.style.display = 'block';
            resultsDiv.style.display = 'none';
            return;
        }
        
        // Display results
        displayZipResults(results);
        
    } catch (error) {
        console.error('Error searching ZIP codes:', error);
        errorDiv.innerHTML = `
            <p>${translations[lang].zipSearchError || 'Error searching. Please try again.'}</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">You can try: "Miami, Florida, USA" or "10001" or "New York"</p>
        `;
        errorDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
    }
}

// Zippopotam.us API - Free, no authentication needed
async function searchZippopotam(postalCode) {
    const cleanCode = postalCode.replace(/[-\s]/g, '');
    const results = [];
    
    // Try common country codes
    const countries = ['us', 'ca', 'gb', 'au', 'de', 'fr', 'it', 'es', 'nl', 'be', 'ch', 'at', 'se', 'no', 'dk', 'fi'];
    
    for (const country of countries) {
        try {
            const url = `https://api.zippopotam.us/${country}/${cleanCode}`;
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                if (data.places && data.places.length > 0) {
                    data.places.forEach(place => {
                        results.push({
                            code: data['post code'],
                            city: place['place name'],
                            state: place['state'] || place['state abbreviation'] || '',
                            country: data.country,
                            countryName: getCountryNameFromCode(data.country),
                            lat: place.latitude || '',
                            lng: place.longitude || ''
                        });
                    });
                }
            }
        } catch (error) {
            // Continue to next country
            continue;
        }
    }
    
    return results;
}

// GeoNames place name search
async function searchGeoNamesPlace(placeName) {
    try {
        // Try multiple search strategies
        const searchTerms = [
            placeName,
            placeName + ', USA',
            placeName + ', United States',
            placeName + ', US'
        ];
        
        for (const term of searchTerms) {
            try {
                // Try different query formats
                const queries = [
                    `q=${encodeURIComponent(term)}&maxRows=50&username=demo&featureClass=P&style=full`,
                    `name=${encodeURIComponent(term)}&maxRows=50&username=demo&featureClass=P&style=full`,
                    `name_equals=${encodeURIComponent(term)}&maxRows=50&username=demo&featureClass=P&style=full`
                ];
                
                for (const query of queries) {
                    try {
                        const url = `https://secure.geonames.org/searchJSON?${query}`;
                        const response = await fetch(url, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            const data = await response.json();
                            if (data.geonames && data.geonames.length > 0) {
                                const results = data.geonames
                                    .filter(item => {
                                        const fcode = item.fcode || '';
                                        return fcode.startsWith('PPL') || 
                                               fcode.startsWith('ADM') || 
                                               fcode === 'PCLI' ||
                                               item.population > 0;
                                    })
                                    .slice(0, 30)
                                    .map(item => ({
                                        code: (item.postalCodes && item.postalCodes.length > 0) ? item.postalCodes[0] : 
                                              (item.postalcode ? item.postalcode : 'N/A'),
                                        city: item.name,
                                        state: item.adminName1 || item.adminName2 || '',
                                        country: item.countryCode,
                                        countryName: item.countryName,
                                        lat: item.lat,
                                        lng: item.lng
                                    }));
                                
                                if (results.length > 0) {
                                    return results;
                                }
                            }
                        }
                    } catch (error) {
                        console.log('Query attempt failed:', error);
                        continue;
                    }
                }
            } catch (error) {
                continue;
            }
        }
        
        // If no results, try a broader search without feature class restriction
        try {
            const url = `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(placeName)}&maxRows=30&username=demo&style=full`;
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                if (data.geonames && data.geonames.length > 0) {
                    return data.geonames
                        .filter(item => {
                            const name = (item.name || '').toLowerCase();
                            const searchLower = placeName.toLowerCase();
                            return name.includes(searchLower) || searchLower.includes(name);
                        })
                        .slice(0, 20)
                        .map(item => ({
                            code: (item.postalCodes && item.postalCodes.length > 0) ? item.postalCodes[0] : 
                                  (item.postalcode ? item.postalcode : 'N/A'),
                            city: item.name,
                            state: item.adminName1 || item.adminName2 || '',
                            country: item.countryCode,
                            countryName: item.countryName,
                            lat: item.lat,
                            lng: item.lng
                        }));
                }
            }
        } catch (error) {
            console.log('Broad search failed:', error);
        }
        
    } catch (error) {
        console.error('GeoNames place search error:', error);
    }
    
    return [];
}

// GeoNames postal code search
async function searchGeoNamesPostal(searchTerm) {
    // If it looks like a postal code, search directly
    const cleanCode = searchTerm.replace(/[-\s]/g, '');
    if (/^\d+$/.test(cleanCode)) {
        try {
            const url = `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${encodeURIComponent(cleanCode)}&maxRows=50&username=demo`;
            const response = await fetch(url);
            
            if (response.ok) {
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
            }
        } catch (error) {
            console.error('GeoNames postal search error:', error);
        }
    }
    
    return [];
}

// Fallback to local database
function searchLocalDatabase(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    const results = [];
    
    // Common US cities that might not be in GeoNames
    const usCities = {
        'miami': { state: 'Florida', zip: '33101' },
        'orlando': { state: 'Florida', zip: '32801' },
        'tampa': { state: 'Florida', zip: '33601' },
        'jacksonville': { state: 'Florida', zip: '32201' },
        'atlanta': { state: 'Georgia', zip: '30301' },
        'charlotte': { state: 'North Carolina', zip: '28201' },
        'nashville': { state: 'Tennessee', zip: '37201' },
        'austin': { state: 'Texas', zip: '78701' },
        'dallas': { state: 'Texas', zip: '75201' },
        'houston': { state: 'Texas', zip: '77001' },
        'phoenix': { state: 'Arizona', zip: '85001' },
        'denver': { state: 'Colorado', zip: '80201' },
        'seattle': { state: 'Washington', zip: '98101' },
        'portland': { state: 'Oregon', zip: '97201' },
        'las vegas': { state: 'Nevada', zip: '89101' }
    };
    
    // Check US cities first
    Object.keys(usCities).forEach(city => {
        if (city.includes(searchLower) || searchLower.includes(city)) {
            const cityData = usCities[city];
            results.push({
                code: cityData.zip,
                city: city.charAt(0).toUpperCase() + city.slice(1),
                state: cityData.state,
                country: 'US',
                countryName: 'United States',
                lat: '',
                lng: ''
            });
        }
    });
    
    // Search through our countries data
    const countries = getAllCountries();
    countries.forEach(country => {
        // Check if country matches
        if (country.toLowerCase().includes(searchLower)) {
            const cities = getCitiesForCountry(country);
            cities.forEach(city => {
                results.push({
                    code: 'N/A',
                    city: city,
                    state: '',
                    country: country,
                    countryName: country,
                    lat: '',
                    lng: ''
                });
            });
        } else {
            // Check cities
            const cities = getCitiesForCountry(country);
            cities.forEach(city => {
                if (city.toLowerCase().includes(searchLower)) {
                    results.push({
                        code: 'N/A',
                        city: city,
                        state: '',
                        country: country,
                        countryName: country,
                        lat: '',
                        lng: ''
                    });
                }
            });
        }
    });
    
    return results.slice(0, 30);
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
        'LV': 'Latvia', 'EE': 'Estonia', 'LU': 'Luxembourg', 'MT': 'Malta', 'CY': 'Cyprus', 'IS': 'Iceland',
        'NZ': 'New Zealand', 'SG': 'Singapore', 'MY': 'Malaysia', 'TH': 'Thailand', 'VN': 'Vietnam', 'PH': 'Philippines'
    };
    return countryCodes[code] || code;
}

function displayZipResults(results) {
    const resultsDiv = document.getElementById('zipResults');
    const resultsList = document.getElementById('zipResultsList');
    
    if (!resultsList || !resultsDiv) return;
    
    resultsList.innerHTML = '';
    
    // Remove duplicates
    const uniqueResults = [];
    const seen = new Set();
    
    results.forEach(item => {
        const key = `${item.city}-${item.country}-${item.code}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueResults.push(item);
        }
    });
    
    uniqueResults.slice(0, 50).forEach(item => {
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
                ${item.lat && item.lng ? `<small class="zip-coords">📍 ${parseFloat(item.lat).toFixed(4)}, ${parseFloat(item.lng).toFixed(4)}</small>` : ''}
            </div>
        `;
        resultsList.appendChild(resultItem);
    });
    
    if (uniqueResults.length >= 50) {
        const moreItem = document.createElement('div');
        moreItem.className = 'zip-result-item';
        moreItem.style.textAlign = 'center';
        moreItem.style.padding = '1rem';
        moreItem.style.fontStyle = 'italic';
        moreItem.style.color = 'var(--text-light)';
        moreItem.innerHTML = `Showing 50 of ${uniqueResults.length} results. Try a more specific search for better results.`;
        resultsList.appendChild(moreItem);
    }
    
    resultsDiv.style.display = 'block';
}

// Make function globally available
window.searchZip = searchZip;
