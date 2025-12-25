// Comprehensive list of all countries and their currencies

const countriesData = {
    'Afghanistan': { code: 'AF', currency: 'AFN', currencyName: 'Afghan Afghani', zipFormat: 'NNNN' },
    'Albania': { code: 'AL', currency: 'ALL', currencyName: 'Albanian Lek', zipFormat: 'NNNN' },
    'Algeria': { code: 'DZ', currency: 'DZD', currencyName: 'Algerian Dinar', zipFormat: 'NNNNN' },
    'Argentina': { code: 'AR', currency: 'ARS', currencyName: 'Argentine Peso', zipFormat: 'ANNNNAAA' },
    'Australia': { code: 'AU', currency: 'AUD', currencyName: 'Australian Dollar', zipFormat: 'NNNN' },
    'Austria': { code: 'AT', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNN' },
    'Bahrain': { code: 'BH', currency: 'BHD', currencyName: 'Bahraini Dinar', zipFormat: 'NNN' },
    'Bangladesh': { code: 'BD', currency: 'BDT', currencyName: 'Bangladeshi Taka', zipFormat: 'NNNN' },
    'Belgium': { code: 'BE', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNN' },
    'Brazil': { code: 'BR', currency: 'BRL', currencyName: 'Brazilian Real', zipFormat: 'NNNNN-NNN' },
    'Bulgaria': { code: 'BG', currency: 'BGN', currencyName: 'Bulgarian Lev', zipFormat: 'NNNN' },
    'Canada': { code: 'CA', currency: 'CAD', currencyName: 'Canadian Dollar', zipFormat: 'ANA NAN' },
    'Chile': { code: 'CL', currency: 'CLP', currencyName: 'Chilean Peso', zipFormat: 'NNNNNNN' },
    'China': { code: 'CN', currency: 'CNY', currencyName: 'Chinese Yuan', zipFormat: 'NNNNNN' },
    'Colombia': { code: 'CO', currency: 'COP', currencyName: 'Colombian Peso', zipFormat: 'NNNNNN' },
    'Croatia': { code: 'HR', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNNN' },
    'Czech Republic': { code: 'CZ', currency: 'CZK', currencyName: 'Czech Koruna', zipFormat: 'NNN NN' },
    'Denmark': { code: 'DK', currency: 'DKK', currencyName: 'Danish Krone', zipFormat: 'NNNN' },
    'Egypt': { code: 'EG', currency: 'EGP', currencyName: 'Egyptian Pound', zipFormat: 'NNNNN' },
    'Finland': { code: 'FI', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNNN' },
    'France': { code: 'FR', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNNN' },
    'Germany': { code: 'DE', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNNN' },
    'Greece': { code: 'GR', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNN NN' },
    'Hong Kong': { code: 'HK', currency: 'HKD', currencyName: 'Hong Kong Dollar', zipFormat: '' },
    'Hungary': { code: 'HU', currency: 'HUF', currencyName: 'Hungarian Forint', zipFormat: 'NNNN' },
    'India': { code: 'IN', currency: 'INR', currencyName: 'Indian Rupee', zipFormat: 'NNNNNN' },
    'Indonesia': { code: 'ID', currency: 'IDR', currencyName: 'Indonesian Rupiah', zipFormat: 'NNNNN' },
    'Iran': { code: 'IR', currency: 'IRR', currencyName: 'Iranian Rial', zipFormat: 'NNNNN-NNNNN' },
    'Iraq': { code: 'IQ', currency: 'IQD', currencyName: 'Iraqi Dinar', zipFormat: 'NNNNN' },
    'Ireland': { code: 'IE', currency: 'EUR', currencyName: 'Euro', zipFormat: '' },
    'Israel': { code: 'IL', currency: 'ILS', currencyName: 'Israeli Shekel', zipFormat: 'NNNNNNN' },
    'Italy': { code: 'IT', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNNN' },
    'Japan': { code: 'JP', currency: 'JPY', currencyName: 'Japanese Yen', zipFormat: 'NNN-NNNN' },
    'Jordan': { code: 'JO', currency: 'JOD', currencyName: 'Jordanian Dinar', zipFormat: 'NNNNN' },
    'Kenya': { code: 'KE', currency: 'KES', currencyName: 'Kenyan Shilling', zipFormat: 'NNNNN' },
    'Kuwait': { code: 'KW', currency: 'KWD', currencyName: 'Kuwaiti Dinar', zipFormat: 'NNNNN' },
    'Lebanon': { code: 'LB', currency: 'LBP', currencyName: 'Lebanese Pound', zipFormat: 'NNNN NNNN' },
    'Malaysia': { code: 'MY', currency: 'MYR', currencyName: 'Malaysian Ringgit', zipFormat: 'NNNNN' },
    'Mexico': { code: 'MX', currency: 'MXN', currencyName: 'Mexican Peso', zipFormat: 'NNNNN' },
    'Morocco': { code: 'MA', currency: 'MAD', currencyName: 'Moroccan Dirham', zipFormat: 'NNNNN' },
    'Netherlands': { code: 'NL', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNN AB' },
    'New Zealand': { code: 'NZ', currency: 'NZD', currencyName: 'New Zealand Dollar', zipFormat: 'NNNN' },
    'Nigeria': { code: 'NG', currency: 'NGN', currencyName: 'Nigerian Naira', zipFormat: 'NNNNNN' },
    'Norway': { code: 'NO', currency: 'NOK', currencyName: 'Norwegian Krone', zipFormat: 'NNNN' },
    'Oman': { code: 'OM', currency: 'OMR', currencyName: 'Omani Rial', zipFormat: 'NNN' },
    'Pakistan': { code: 'PK', currency: 'PKR', currencyName: 'Pakistani Rupee', zipFormat: 'NNNNN' },
    'Philippines': { code: 'PH', currency: 'PHP', currencyName: 'Philippine Peso', zipFormat: 'NNNN' },
    'Poland': { code: 'PL', currency: 'PLN', currencyName: 'Polish Zloty', zipFormat: 'NN-NNN' },
    'Portugal': { code: 'PT', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNN-NNN' },
    'Qatar': { code: 'QA', currency: 'QAR', currencyName: 'Qatari Riyal', zipFormat: '' },
    'Romania': { code: 'RO', currency: 'RON', currencyName: 'Romanian Leu', zipFormat: 'NNNNNN' },
    'Russia': { code: 'RU', currency: 'RUB', currencyName: 'Russian Ruble', zipFormat: 'NNNNNN' },
    'Saudi Arabia': { code: 'SA', currency: 'SAR', currencyName: 'Saudi Riyal', zipFormat: 'NNNNN' },
    'Singapore': { code: 'SG', currency: 'SGD', currencyName: 'Singapore Dollar', zipFormat: 'NNNNNN' },
    'South Africa': { code: 'ZA', currency: 'ZAR', currencyName: 'South African Rand', zipFormat: 'NNNN' },
    'South Korea': { code: 'KR', currency: 'KRW', currencyName: 'South Korean Won', zipFormat: 'NNNNN' },
    'Spain': { code: 'ES', currency: 'EUR', currencyName: 'Euro', zipFormat: 'NNNNN' },
    'Sri Lanka': { code: 'LK', currency: 'LKR', currencyName: 'Sri Lankan Rupee', zipFormat: 'NNNNN' },
    'Sweden': { code: 'SE', currency: 'SEK', currencyName: 'Swedish Krona', zipFormat: 'NNN NN' },
    'Switzerland': { code: 'CH', currency: 'CHF', currencyName: 'Swiss Franc', zipFormat: 'NNNN' },
    'Taiwan': { code: 'TW', currency: 'TWD', currencyName: 'Taiwan Dollar', zipFormat: 'NNNNN' },
    'Thailand': { code: 'TH', currency: 'THB', currencyName: 'Thai Baht', zipFormat: 'NNNNN' },
    'Turkey': { code: 'TR', currency: 'TRY', currencyName: 'Turkish Lira', zipFormat: 'NNNNN' },
    'Ukraine': { code: 'UA', currency: 'UAH', currencyName: 'Ukrainian Hryvnia', zipFormat: 'NNNNN' },
    'United Arab Emirates': { code: 'AE', currency: 'AED', currencyName: 'UAE Dirham', zipFormat: '' },
    'United Kingdom': { code: 'GB', currency: 'GBP', currencyName: 'British Pound', zipFormat: 'AAN NAA' },
    'United States': { code: 'US', currency: 'USD', currencyName: 'US Dollar', zipFormat: 'NNNNN' },
    'Venezuela': { code: 'VE', currency: 'VES', currencyName: 'Venezuelan Bolivar', zipFormat: 'NNNN' },
    'Vietnam': { code: 'VN', currency: 'VND', currencyName: 'Vietnamese Dong', zipFormat: 'NNNNNN' },
    'Yemen': { code: 'YE', currency: 'YER', currencyName: 'Yemeni Rial', zipFormat: '' }
};

// Major cities by country
const majorCities = {
    'Afghanistan': ['Kabul', 'Kandahar', 'Herat'],
    'Albania': ['Tirana', 'Durrës', 'Vlorë'],
    'Algeria': ['Algiers', 'Oran', 'Constantine'],
    'Argentina': ['Buenos Aires', 'Córdoba', 'Rosario'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'Austria': ['Vienna', 'Graz', 'Linz'],
    'Bahrain': ['Manama', 'Riffa', 'Muharraq'],
    'Bangladesh': ['Dhaka', 'Chittagong', 'Khulna'],
    'Belgium': ['Brussels', 'Antwerp', 'Ghent'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
    'Bulgaria': ['Sofia', 'Plovdiv', 'Varna'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    'Chile': ['Santiago', 'Valparaíso', 'Concepción'],
    'China': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
    'Colombia': ['Bogotá', 'Medellín', 'Cali'],
    'Croatia': ['Zagreb', 'Split', 'Rijeka'],
    'Czech Republic': ['Prague', 'Brno', 'Ostrava'],
    'Denmark': ['Copenhagen', 'Aarhus', 'Odense'],
    'Egypt': ['Cairo', 'Alexandria', 'Giza'],
    'Finland': ['Helsinki', 'Espoo', 'Tampere'],
    'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    'Greece': ['Athens', 'Thessaloniki', 'Patras'],
    'Hong Kong': ['Hong Kong', 'Kowloon', 'New Territories'],
    'Hungary': ['Budapest', 'Debrecen', 'Szeged'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    'Indonesia': ['Jakarta', 'Surabaya', 'Bandung'],
    'Iran': ['Tehran', 'Mashhad', 'Isfahan'],
    'Iraq': ['Baghdad', 'Basra', 'Mosul'],
    'Ireland': ['Dublin', 'Cork', 'Limerick'],
    'Israel': ['Tel Aviv', 'Jerusalem', 'Haifa'],
    'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
    'Japan': ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo'],
    'Jordan': ['Amman', 'Zarqa', 'Irbid'],
    'Kenya': ['Nairobi', 'Mombasa', 'Kisumu'],
    'Kuwait': ['Kuwait City', 'Al Ahmadi', 'Hawalli'],
    'Lebanon': ['Beirut', 'Tripoli', 'Sidon'],
    'Malaysia': ['Kuala Lumpur', 'Penang', 'Johor Bahru'],
    'Mexico': ['Mexico City', 'Guadalajara', 'Monterrey'],
    'Morocco': ['Casablanca', 'Rabat', 'Fes'],
    'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague'],
    'New Zealand': ['Auckland', 'Wellington', 'Christchurch'],
    'Nigeria': ['Lagos', 'Abuja', 'Kano'],
    'Norway': ['Oslo', 'Bergen', 'Trondheim'],
    'Oman': ['Muscat', 'Salalah', 'Sohar'],
    'Pakistan': ['Karachi', 'Lahore', 'Islamabad'],
    'Philippines': ['Manila', 'Quezon City', 'Cebu'],
    'Poland': ['Warsaw', 'Kraków', 'Wrocław'],
    'Portugal': ['Lisbon', 'Porto', 'Coimbra'],
    'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah'],
    'Romania': ['Bucharest', 'Cluj-Napoca', 'Timișoara'],
    'Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk'],
    'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Taif', 'Abha'],
    'Singapore': ['Singapore'],
    'South Africa': ['Johannesburg', 'Cape Town', 'Durban'],
    'South Korea': ['Seoul', 'Busan', 'Incheon'],
    'Spain': ['Madrid', 'Barcelona', 'Valencia'],
    'Sri Lanka': ['Colombo', 'Kandy', 'Galle'],
    'Sweden': ['Stockholm', 'Gothenburg', 'Malmö'],
    'Switzerland': ['Zurich', 'Geneva', 'Basel'],
    'Taiwan': ['Taipei', 'Kaohsiung', 'Taichung'],
    'Thailand': ['Bangkok', 'Chiang Mai', 'Pattaya'],
    'Turkey': ['Istanbul', 'Ankara', 'Izmir'],
    'Ukraine': ['Kyiv', 'Kharkiv', 'Odessa'],
    'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    'Venezuela': ['Caracas', 'Maracaibo', 'Valencia'],
    'Vietnam': ['Ho Chi Minh City', 'Hanoi', 'Da Nang'],
    'Yemen': ['Sana\'a', 'Aden', 'Taiz']
};

// Currency exchange rates (approximate, base: SAR)
const currencyRates = {
    'SAR': 1.0,
    'USD': 0.27,
    'EUR': 0.25,
    'GBP': 0.21,
    'AED': 0.98,
    'JPY': 40.0,
    'AUD': 0.41,
    'CAD': 0.36,
    'CHF': 0.24,
    'CNY': 1.92,
    'INR': 22.0,
    'PKR': 74.0,
    'BHD': 0.10,
    'KWD': 0.082,
    'OMR': 0.10,
    'QAR': 0.98,
    'JOD': 0.19,
    'LBP': 405.0,
    'EGP': 8.3,
    'TRY': 8.5,
    'RUB': 24.0,
    'ZAR': 5.0,
    'BRL': 1.35,
    'MXN': 4.5,
    'ARS': 240.0,
    'CLP': 250.0,
    'COP': 1100.0,
    'PEN': 1.0,
    'NZD': 0.44,
    'SGD': 0.36,
    'MYR': 1.27,
    'THB': 9.5,
    'VND': 6500.0,
    'IDR': 4200.0,
    'PHP': 15.0,
    'KRW': 360.0,
    'TWD': 8.5,
    'HKD': 2.1,
    'NOK': 2.8,
    'SEK': 2.8,
    'DKK': 1.87,
    'PLN': 1.08,
    'CZK': 6.2,
    'HUF': 95.0,
    'RON': 1.25,
    'BGN': 0.49,
    'ILS': 1.0,
    'NGN': 400.0,
    'KES': 35.0,
    'ZAR': 5.0,
    'AFN': 19.0,
    'BDT': 30.0,
    'LKR': 85.0,
    'IRR': 11200.0,
    'IQD': 350.0,
    'YER': 67.0
};

// Get all countries as sorted array
function getAllCountries() {
    return Object.keys(countriesData).sort();
}

// Get cities for a country
function getCitiesForCountry(country) {
    return majorCities[country] || [];
}

// Get currency for a country
function getCurrencyForCountry(country) {
    return countriesData[country] ? countriesData[country].currency : 'USD';
}

// Get currency name for a country
function getCurrencyNameForCountry(country) {
    return countriesData[country] ? countriesData[country].currencyName : 'US Dollar';
}

// Get all unique currencies
function getAllCurrencies() {
    const currencies = new Set();
    Object.values(countriesData).forEach(country => {
        currencies.add(country.currency);
    });
    return Array.from(currencies).sort().map(code => {
        const country = Object.values(countriesData).find(c => c.currency === code);
        return {
            code: code,
            name: country ? country.currencyName : code
        };
    });
}

// Get exchange rate
function getExchangeRate(currency) {
    return currencyRates[currency] || 1.0;
}


