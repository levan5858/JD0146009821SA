// Price calculator functionality

// Distance matrix (in km) between major Saudi cities
const cityDistances = {
    'Riyadh': { 'Jeddah': 950, 'Dammam': 395, 'Mecca': 870, 'Medina': 850, 'Khobar': 410, 'Taif': 780, 'Abha': 1060 },
    'Jeddah': { 'Riyadh': 950, 'Dammam': 1340, 'Mecca': 75, 'Medina': 420, 'Khobar': 1350, 'Taif': 170, 'Abha': 625 },
    'Dammam': { 'Riyadh': 395, 'Jeddah': 1340, 'Mecca': 1265, 'Medina': 1245, 'Khobar': 25, 'Taif': 1175, 'Abha': 1455 },
    'Mecca': { 'Riyadh': 870, 'Jeddah': 75, 'Dammam': 1265, 'Medina': 345, 'Khobar': 1275, 'Taif': 95, 'Abha': 550 },
    'Medina': { 'Riyadh': 850, 'Jeddah': 420, 'Dammam': 1245, 'Mecca': 345, 'Khobar': 1255, 'Taif': 515, 'Abha': 1045 },
    'Khobar': { 'Riyadh': 410, 'Jeddah': 1350, 'Dammam': 25, 'Mecca': 1275, 'Medina': 1255, 'Taif': 1185, 'Abha': 1465 },
    'Taif': { 'Riyadh': 780, 'Jeddah': 170, 'Dammam': 1175, 'Mecca': 95, 'Medina': 515, 'Khobar': 1185, 'Abha': 455 },
    'Abha': { 'Riyadh': 1060, 'Jeddah': 625, 'Dammam': 1455, 'Mecca': 550, 'Medina': 1045, 'Khobar': 1465, 'Taif': 455 }
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
    
    // Calculate base price
    const basePrice = 25.00; // Base price in SAR
    
    // Calculate weight charge (5 SAR per kg)
    const weightCharge = weight * 5;
    
    // Calculate dimensional weight
    const dimensionalWeight = (length * width * height) / 5000; // in kg
    const chargeableWeight = Math.max(weight, dimensionalWeight);
    const adjustedWeightCharge = chargeableWeight * 5;
    
    // Calculate distance
    const distance = cityDistances[origin] && cityDistances[origin][destination] 
        ? cityDistances[origin][destination] 
        : 500; // Default distance if not found
    
    // Distance charge (0.15 SAR per km)
    const distanceCharge = distance * 0.15;
    
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
    
    const serviceCharge = (basePrice + adjustedWeightCharge + distanceCharge) * (serviceMultiplier - 1);
    
    // Insurance charge (1% of declared value if insurance is required)
    let insuranceCharge = 0;
    if (insuranceRequired && declaredValue > 0) {
        insuranceCharge = declaredValue * 0.01;
    }
    
    // Calculate total
    const total = basePrice + adjustedWeightCharge + distanceCharge + serviceCharge + insuranceCharge;
    
    // Display results
    document.getElementById('basePrice').textContent = basePrice.toFixed(2);
    document.getElementById('weightCharge').textContent = adjustedWeightCharge.toFixed(2);
    document.getElementById('distanceCharge').textContent = distanceCharge.toFixed(2);
    document.getElementById('serviceCharge').textContent = serviceCharge.toFixed(2);
    
    if (insuranceRequired && insuranceCharge > 0) {
        document.getElementById('insuranceCharge').textContent = insuranceCharge.toFixed(2);
        document.getElementById('insuranceRow').style.display = 'flex';
    } else {
        document.getElementById('insuranceRow').style.display = 'none';
    }
    
    document.getElementById('totalPrice').textContent = total.toFixed(2);
    resultsDiv.style.display = 'block';
}

