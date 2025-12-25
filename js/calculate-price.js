// Price calculator functionality - Global support with all countries

document.addEventListener('DOMContentLoaded', function() {
    // Populate countries dropdowns
    const originCountrySelect = document.getElementById('originCountry');
    const destinationCountrySelect = document.getElementById('destinationCountry');
    const currencySelect = document.getElementById('currencySelect');
    
    if (originCountrySelect && destinationCountrySelect) {
        const countries = getAllCountries();
        countries.forEach(country => {
            const option1 = document.createElement('option');
            option1.value = country;
            option1.textContent = country;
            originCountrySelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = country;
            option2.textContent = country;
            destinationCountrySelect.appendChild(option2);
        });
        
        // Set default to Saudi Arabia
        originCountrySelect.value = 'Saudi Arabia';
        destinationCountrySelect.value = 'Saudi Arabia';
        updateCitiesForCountry('originCountry', 'originCity', 'Saudi Arabia');
        updateCitiesForCountry('destinationCountry', 'destinationCity', 'Saudi Arabia');
        
        // Add event listeners for country changes
        originCountrySelect.addEventListener('change', function() {
            updateCitiesForCountry('originCountry', 'originCity', this.value);
        });
        
        destinationCountrySelect.addEventListener('change', function() {
            updateCitiesForCountry('destinationCountry', 'destinationCity', this.value);
        });
    }
    
    // Populate currencies dropdown
    if (currencySelect) {
        const currencies = getAllCurrencies();
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency.code;
            option.textContent = `${currency.code} (${currency.name})`;
            currencySelect.appendChild(option);
        });
    }
    
    const priceForm = document.getElementById('priceCalculatorForm');
    
    if (priceForm) {
        priceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculatePrice();
        });
    }
});

function updateCitiesForCountry(countrySelectId, citySelectId, country) {
    const citySelect = document.getElementById(citySelectId);
    if (!citySelect) return;
    
    citySelect.innerHTML = '';
    
    if (!country) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Select Country First';
        citySelect.appendChild(option);
        citySelect.disabled = true;
        return;
    }
    
    citySelect.disabled = false;
    const cities = getCitiesForCountry(country);
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select City';
    citySelect.appendChild(defaultOption);
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city}, ${country}`;
        option.textContent = `${city}, ${country}`;
        citySelect.appendChild(option);
    });
}

// Distance calculation function (simplified - uses country-based estimation)
function calculateDistance(origin, destination) {
    // Extract country from "City, Country" format
    const originCountry = origin.includes(',') ? origin.split(',')[1].trim() : origin;
    const destCountry = destination.includes(',') ? destination.split(',')[1].trim() : destination;
    
    // If same country, estimate 500km
    if (originCountry === destCountry) {
        return 500;
    }
    
    // International shipping - estimate based on region
    // This is a simplified calculation. In production, you'd use a real distance API
    const regions = {
        'Saudi Arabia': { lat: 24.0, lon: 45.0 },
        'United States': { lat: 39.0, lon: -98.0 },
        'United Kingdom': { lat: 54.0, lon: -2.0 },
        'China': { lat: 35.0, lon: 105.0 },
        'Japan': { lat: 36.0, lon: 138.0 },
        'Australia': { lat: -25.0, lon: 133.0 },
        'Canada': { lat: 56.0, lon: -106.0 },
        'Germany': { lat: 51.0, lon: 9.0 },
        'France': { lat: 46.0, lon: 2.0 },
        'United Arab Emirates': { lat: 24.0, lon: 54.0 },
        'India': { lat: 20.0, lon: 77.0 },
        'Brazil': { lat: -14.0, lon: -51.0 },
        'Russia': { lat: 61.0, lon: 105.0 },
        'South Africa': { lat: -30.0, lon: 25.0 }
    };
    
    const originRegion = regions[originCountry] || { lat: 0, lon: 0 };
    const destRegion = regions[destCountry] || { lat: 0, lon: 0 };
    
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = (destRegion.lat - originRegion.lat) * Math.PI / 180;
    const dLon = (destRegion.lon - originRegion.lon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(originRegion.lat * Math.PI / 180) * Math.cos(destRegion.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.max(distance, 1000); // Minimum 1000km for international
}

function calculatePrice() {
    const lang = currentLang || 'ar';
    const originCountry = document.getElementById('originCountry').value;
    const originCity = document.getElementById('originCity').value;
    const destinationCountry = document.getElementById('destinationCountry').value;
    const destinationCity = document.getElementById('destinationCity').value;
    const weight = parseFloat(document.getElementById('shipmentWeight').value);
    const length = parseFloat(document.getElementById('shipmentLength').value);
    const width = parseFloat(document.getElementById('shipmentWidth').value);
    const height = parseFloat(document.getElementById('shipmentHeight').value);
    const serviceType = document.getElementById('serviceType').value;
    const insuranceRequired = document.getElementById('insuranceRequired').checked;
    const declaredValue = parseFloat(document.getElementById('declaredValue').value) || 0;
    const currency = document.getElementById('currencySelect') ? document.getElementById('currencySelect').value : 'SAR';
    
    const resultsDiv = document.getElementById('priceResults');
    const errorDiv = document.getElementById('priceError');
    
    // Hide previous results
    resultsDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Validation
    if (!originCountry || !originCity || !destinationCountry || !destinationCity || !weight || !length || !width || !height) {
        errorDiv.textContent = translations[lang].alertFillRequired || 'Please fill in all fields';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (originCity === destinationCity) {
        errorDiv.textContent = translations[lang].sameCityError || 'Origin and destination cannot be the same';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Calculate base price in SAR
    const basePriceSAR = 25.00;
    
    // Calculate weight charge (5 SAR per kg)
    const weightChargeSAR = weight * 5;
    
    // Calculate dimensional weight
    const dimensionalWeight = (length * width * height) / 5000; // in kg
    const chargeableWeight = Math.max(weight, dimensionalWeight);
    const adjustedWeightChargeSAR = chargeableWeight * 5;
    
    // Calculate distance
    const distance = calculateDistance(originCity, destinationCity);
    
    // Distance charge (0.15 SAR per km for domestic, 0.25 SAR per km for international)
    const isInternational = originCountry !== destinationCountry;
    const distanceRate = isInternational ? 0.25 : 0.15;
    const distanceChargeSAR = distance * distanceRate;
    
    // Service type multiplier
    let serviceMultiplier = 1.0;
    switch(serviceType) {
        case 'express':
            serviceMultiplier = 1.5;
            break;
        case 'overnight':
            serviceMultiplier = 2.0;
            break;
        case 'secure':
            serviceMultiplier = 1.8;
            break;
        default:
            serviceMultiplier = 1.0;
    }
    
    const serviceChargeSAR = (basePriceSAR + adjustedWeightChargeSAR + distanceChargeSAR) * (serviceMultiplier - 1);
    
    // Insurance charge (1% of declared value if insurance is required)
    let insuranceChargeSAR = 0;
    if (insuranceRequired && declaredValue > 0) {
        insuranceChargeSAR = declaredValue * 0.01;
    }
    
    // Calculate total in SAR
    const totalSAR = basePriceSAR + adjustedWeightChargeSAR + distanceChargeSAR + serviceChargeSAR + insuranceChargeSAR;
    
    // Convert to selected currency
    const rate = getExchangeRate(currency);
    const basePrice = basePriceSAR * rate;
    const adjustedWeightCharge = adjustedWeightChargeSAR * rate;
    const distanceCharge = distanceChargeSAR * rate;
    const serviceCharge = serviceChargeSAR * rate;
    const insuranceCharge = insuranceChargeSAR * rate;
    const total = totalSAR * rate;
    
    // Get currency symbol
    const currencySymbols = {
        'SAR': 'SAR', 'USD': '$', 'EUR': '€', 'GBP': '£', 'AED': 'AED', 'JPY': '¥', 'AUD': 'A$', 'CAD': 'C$',
        'CHF': 'CHF', 'CNY': '¥', 'INR': '₹', 'PKR': '₨', 'BHD': 'BD', 'KWD': 'KD', 'OMR': 'OMR', 'QAR': 'QR',
        'JOD': 'JD', 'LBP': 'L£', 'EGP': 'E£', 'TRY': '₺', 'RUB': '₽', 'ZAR': 'R', 'BRL': 'R$', 'MXN': '$',
        'ARS': '$', 'CLP': '$', 'COP': '$', 'NZD': 'NZ$', 'SGD': 'S$', 'MYR': 'RM', 'THB': '฿', 'VND': '₫',
        'IDR': 'Rp', 'PHP': '₱', 'KRW': '₩', 'TWD': 'NT$', 'HKD': 'HK$', 'NOK': 'kr', 'SEK': 'kr', 'DKK': 'kr',
        'PLN': 'zł', 'CZK': 'Kč', 'HUF': 'Ft', 'RON': 'lei', 'BGN': 'лв', 'ILS': '₪', 'NGN': '₦', 'KES': 'KSh'
    };
    const currencySymbol = currencySymbols[currency] || currency;
    
    // Display results
    document.getElementById('basePrice').textContent = basePrice.toFixed(2);
    document.getElementById('weightCharge').textContent = adjustedWeightCharge.toFixed(2);
    document.getElementById('distanceCharge').textContent = distanceCharge.toFixed(2);
    document.getElementById('serviceCharge').textContent = serviceCharge.toFixed(2);
    
    // Update currency display
    const currencyElements = document.querySelectorAll('.currency-display');
    currencyElements.forEach(el => {
        if (el) {
            el.textContent = currencySymbol;
        }
    });
    
    if (insuranceRequired && insuranceCharge > 0) {
        document.getElementById('insuranceCharge').textContent = insuranceCharge.toFixed(2);
        document.getElementById('insuranceRow').style.display = 'flex';
    } else {
        document.getElementById('insuranceRow').style.display = 'none';
    }
    
    document.getElementById('totalPrice').textContent = total.toFixed(2);
    resultsDiv.style.display = 'block';
}
