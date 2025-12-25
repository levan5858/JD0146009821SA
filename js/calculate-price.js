// Price calculator functionality - Global support

// Currency exchange rates (base: SAR)
const currencyRates = {
    'SAR': 1.0,
    'USD': 0.27,
    'EUR': 0.25,
    'GBP': 0.21,
    'AED': 0.98,
    'JPY': 40.0,
    'AUD': 0.41,
    'CAD': 0.36
};

// Distance matrix (in km) - Global cities
const cityDistances = {
    'Riyadh': { 'Dubai': 850, 'London': 4800, 'New York': 11000, 'Paris': 4500, 'Tokyo': 8200, 'Sydney': 12000, 'Toronto': 11000, 'Berlin': 4200, 'Beijing': 7000 },
    'Dubai': { 'Riyadh': 850, 'London': 5500, 'New York': 11000, 'Paris': 5200, 'Tokyo': 7500, 'Sydney': 11000, 'Toronto': 11000, 'Berlin': 4900, 'Beijing': 6000 },
    'London': { 'Riyadh': 4800, 'Dubai': 5500, 'New York': 5500, 'Paris': 350, 'Tokyo': 9600, 'Sydney': 17000, 'Toronto': 5700, 'Berlin': 930, 'Beijing': 8100 },
    'New York': { 'Riyadh': 11000, 'Dubai': 11000, 'London': 5500, 'Paris': 5800, 'Tokyo': 10800, 'Sydney': 16000, 'Toronto': 800, 'Berlin': 6400, 'Beijing': 11000 },
    'Paris': { 'Riyadh': 4500, 'Dubai': 5200, 'London': 350, 'New York': 5800, 'Tokyo': 9700, 'Sydney': 17000, 'Toronto': 6000, 'Berlin': 880, 'Beijing': 8200 },
    'Tokyo': { 'Riyadh': 8200, 'Dubai': 7500, 'London': 9600, 'New York': 10800, 'Paris': 9700, 'Sydney': 7800, 'Toronto': 10300, 'Berlin': 9200, 'Beijing': 2100 },
    'Sydney': { 'Riyadh': 12000, 'Dubai': 11000, 'London': 17000, 'New York': 16000, 'Paris': 17000, 'Tokyo': 7800, 'Toronto': 15000, 'Berlin': 16000, 'Beijing': 9000 },
    'Toronto': { 'Riyadh': 11000, 'Dubai': 11000, 'London': 5700, 'New York': 800, 'Paris': 6000, 'Tokyo': 10300, 'Sydney': 15000, 'Berlin': 6200, 'Beijing': 11000 },
    'Berlin': { 'Riyadh': 4200, 'Dubai': 4900, 'London': 930, 'New York': 6400, 'Paris': 880, 'Tokyo': 9200, 'Sydney': 16000, 'Toronto': 6200, 'Beijing': 7400 },
    'Beijing': { 'Riyadh': 7000, 'Dubai': 6000, 'London': 8100, 'New York': 11000, 'Paris': 8200, 'Tokyo': 2100, 'Sydney': 9000, 'Toronto': 11000, 'Berlin': 7400 }
};

document.addEventListener('DOMContentLoaded', function() {
    const priceForm = document.getElementById('priceCalculatorForm');
    
    if (priceForm) {
        priceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculatePrice();
        });
    }
});

function calculatePrice() {
    const lang = currentLang || 'ar';
    const origin = document.getElementById('originCity').value;
    const destination = document.getElementById('destinationCity').value;
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
    if (!origin || !destination || !weight || !length || !width || !height) {
        errorDiv.textContent = translations[lang].alertFillRequired || 'Please fill in all fields';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (origin === destination) {
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
    const distance = cityDistances[origin] && cityDistances[origin][destination] 
        ? cityDistances[origin][destination] 
        : 5000; // Default distance for international
    
    // Distance charge (0.15 SAR per km for domestic, 0.25 SAR per km for international)
    const isInternational = distance > 2000;
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
    const rate = currencyRates[currency] || 1.0;
    const basePrice = basePriceSAR * rate;
    const adjustedWeightCharge = adjustedWeightChargeSAR * rate;
    const distanceCharge = distanceChargeSAR * rate;
    const serviceCharge = serviceChargeSAR * rate;
    const insuranceCharge = insuranceChargeSAR * rate;
    const total = totalSAR * rate;
    
    // Get currency symbol
    const currencySymbols = {
        'SAR': 'SAR',
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'AED': 'AED',
        'JPY': '¥',
        'AUD': 'A$',
        'CAD': 'C$'
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
