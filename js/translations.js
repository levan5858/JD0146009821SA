// Translation system for AL SAHRA PRECIOUS METALS website

const translations = {
    ar: {
        // Page Titles
        pageTitle: "AL SAHRA PRECIOUS METALS & LOGISTICS LLC - Track Your Shipment",
        trackingTitle: "تتبع الشحنة - AL SAHRA PRECIOUS METALS",
        adminTitle: "لوحة التحكم - AL SAHRA PRECIOUS METALS",
        contactTitle: "اتصل بنا - AL SAHRA PRECIOUS METALS",
        zipLookupTitle: "البحث عن الرمز البريدي - AL SAHRA PRECIOUS METALS",
        calculatePriceTitle: "حساب السعر - AL SAHRA PRECIOUS METALS",
        schedulePickupTitle: "جدولة الاستلام - AL SAHRA PRECIOUS METALS",
        
        // Navigation
        navHome: "الرئيسية",
        navTracking: "تتبع الشحنة",
        navZipLookup: "البحث عن الرمز البريدي",
        navCalculatePrice: "حساب السعر",
        navSchedulePickup: "جدولة الاستلام",
        navContact: "اتصل بنا",
        navAdmin: "لوحة التحكم",
        
        // Header
        tagline: "خدمات الشحن والتوصيل الموثوقة",
        taglineAdmin: "لوحة التحكم",
        
        // Home Page
        heroTitle: "تتبع شحنتك بسهولة",
        heroSubtitle: "أدخل رقم التتبع الخاص بك للحصول على آخر تحديثات شحنتك",
        trackPlaceholder: "أدخل رقم التتبع",
        trackButton: "تتبع",
        
        // Services
        servicesTitle: "خدماتنا",
        serviceFast: "شحن سريع",
        serviceFastDesc: "خدمة شحن سريعة وآمنة داخل المملكة العربية السعودية",
        serviceInternational: "شحن دولي",
        serviceInternationalDesc: "نقل البضائع الثمينة والمعادن إلى جميع أنحاء العالم",
        serviceSecure: "أمان مضمون",
        serviceSecureDesc: "حماية كاملة لشحناتك مع تأمين شامل",
        serviceRealTime: "تتبع مباشر",
        serviceRealTimeDesc: "تتبع شحنتك في الوقت الفعلي من أي مكان",
        
        // About
        aboutTitle: "من نحن",
        aboutText: "AL SAHRA PRECIOUS METALS & LOGISTICS LLC هي شركة رائدة في مجال الشحن والخدمات اللوجستية في المملكة العربية السعودية. نحن متخصصون في نقل المعادن الثمينة والبضائع عالية القيمة بأعلى معايير الأمان والجودة.",
        
        // Tracking Page
        trackingTitle: "تتبع شحنتك",
        trackingNumber: "رقم التتبع",
        status: "الحالة",
        location: "الموقع",
        date: "التاريخ",
        notes: "ملاحظات",
        shipmentDetails: "تفاصيل الشحنة",
        sender: "المرسل",
        recipient: "المستلم",
        weight: "الوزن",
        description: "الوصف",
        errorNotFound: "لم يتم العثور على شحنة بهذا الرقم. يرجى التحقق من رقم التتبع والمحاولة مرة أخرى.",
        
        // Status Types
        statusPending: "قيد الانتظار",
        statusPickedUp: "تم الاستلام",
        statusInTransit: "قيد النقل",
        statusOutForDelivery: "قيد التوصيل",
        statusDelivered: "تم التسليم",
        statusException: "استثناء",
        
        // Admin Panel
        adminTitle: "لوحة التحكم - إدارة الشحنات",
        tabCreate: "إنشاء شحنة جديدة",
        tabManage: "إدارة الشحنات",
        createTitle: "إنشاء شحنة جديدة",
        labelTrackingNumber: "رقم التتبع:",
        labelRecipientName: "اسم المستلم:",
        labelRecipientAddress: "عنوان المستلم:",
        labelSenderName: "اسم المرسل:",
        labelSenderAddress: "عنوان المرسل:",
        labelWeight: "الوزن (كجم):",
        labelDescription: "وصف الشحنة:",
        createButton: "إنشاء الشحنة",
        searchPlaceholder: "ابحث برقم التتبع...",
        searchButton: "بحث",
        noShipments: "لا توجد شحنات حالياً",
        notFound: "لم يتم العثور على شحنة بهذا الرقم",
        currentStatus: "الحالة الحالية:",
        updateCount: "عدد التحديثات:",
        editStatus: "تعديل الحالة",
        editStatusTitle: "تعديل حالة الشحنة",
        addNewStatus: "إضافة حالة جديدة:",
        labelLocation: "الموقع:",
        labelDateTime: "التاريخ والوقت:",
        labelNotes: "ملاحظات:",
        addStatusButton: "إضافة الحالة",
        alertFillRequired: "يرجى ملء جميع الحقول المطلوبة",
        alertTrackingExists: "رقم التتبع موجود بالفعل",
        alertCreated: "تم إنشاء الشحنة بنجاح!",
        alertUpdated: "تم تحديث حالة الشحنة بنجاح!",
        editDescriptionTitle: "تعديل وصف الشحنة",
        saveDescription: "حفظ الوصف",
        statusNote: "يمكنك اختيار أي حالة، حتى العودة إلى حالة سابقة",
        viewHistory: "عرض السجل",
        statusHistoryTitle: "سجل الحالات",
        deleteStatus: "حذف",
        confirmDelete: "هل أنت متأكد من حذف هذه الحالة؟",
        statusDeleted: "تم حذف الحالة بنجاح",
        editTags: "تعديل العلامات",
        editTagsTitle: "تعديل العلامات",
        labelTags: "العلامات:",
        tagInputPlaceholder: "أدخل علامة واضغط Enter",
        addTag: "إضافة",
        tags: "العلامات",
        tagSuggestions: "اقتراحات:",
        saveTags: "حفظ العلامات",
        tagsSaved: "تم حفظ العلامات بنجاح",
        
        // Contact Page
        contactPageTitle: "اتصل بنا",
        contactPageSubtitle: "نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية",
        contactFormTitle: "أرسل لنا رسالة",
        contactInfoTitle: "معلومات الاتصال",
        labelName: "الاسم:",
        labelEmail: "البريد الإلكتروني:",
        labelPhone: "رقم الهاتف:",
        labelSubject: "الموضوع:",
        labelMessage: "الرسالة:",
        selectSubject: "اختر الموضوع",
        subjectGeneral: "استفسار عام",
        subjectTracking: "استفسار عن التتبع",
        subjectPricing: "استفسار عن الأسعار",
        subjectPickup: "جدولة استلام",
        subjectComplaint: "شكوى",
        subjectOther: "أخرى",
        sendMessage: "إرسال الرسالة",
        contactFormSuccess: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
        contactFormError: "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        addressTitle: "العنوان",
        phoneTitle: "الهاتف",
        emailTitle: "البريد الإلكتروني",
        crNumberTitle: "الرقم الموحد",
        businessHoursTitle: "ساعات العمل",
        businessHours: "السبت - الخميس: 8:00 ص - 6:00 م<br>الجمعة: مغلق",
        
        // ZIP Lookup Page
        zipLookupPageTitle: "البحث عن الرمز البريدي",
        zipLookupSubtitle: "ابحث عن الرمز البريدي لأي منطقة في المملكة العربية السعودية",
        zipSearchLabel: "ابحث بالمدينة أو المنطقة أو الرمز البريدي:",
        zipSearchPlaceholder: "مثال: الرياض، جدة، 11564",
        zipResultsTitle: "نتائج البحث",
        zipNotFound: "لم يتم العثور على نتائج",
        popularCitiesTitle: "المدن الشائعة",
        cityRiyadh: "الرياض",
        cityJeddah: "جدة",
        cityDammam: "الدمام",
        cityMecca: "مكة المكرمة",
        cityMedina: "المدينة المنورة",
        cityKhobar: "الخبر",
        cityTaif: "الطائف",
        cityAbha: "أبها",
        selectCity: "اختر المدينة",
        
        // Calculate Price Page
        calculatePricePageTitle: "حساب سعر الشحن",
        calculatePriceSubtitle: "احسب تكلفة شحنتك بناءً على الوزن والأبعاد وطريقة الشحن",
        shipmentDetails: "تفاصيل الشحنة",
        labelOrigin: "المدينة الأصلية:",
        labelDestination: "المدينة الوجهة:",
        labelLength: "الطول (سم):",
        labelWidth: "العرض (سم):",
        labelHeight: "الارتفاع (سم):",
        labelServiceType: "نوع الخدمة:",
        serviceStandard: "عادي (3-5 أيام)",
        serviceExpress: "سريع (1-2 أيام)",
        serviceOvernight: "ليلي (24 ساعة)",
        serviceSecure: "مؤمن (مع تأمين)",
        insuranceRequired: "تأمين إضافي (1% من قيمة الشحنة)",
        labelDeclaredValue: "القيمة المعلنة (ريال سعودي):",
        calculateButton: "احسب السعر",
        priceEstimate: "التقدير",
        basePrice: "السعر الأساسي:",
        weightCharge: "رسوم الوزن:",
        distanceCharge: "رسوم المسافة:",
        serviceCharge: "رسوم الخدمة:",
        insuranceCharge: "رسوم التأمين:",
        totalPrice: "المجموع:",
        currency: "ريال",
        priceNote: "* هذا تقدير تقريبي. قد يختلف السعر النهائي حسب التفاصيل الفعلية للشحنة.",
        sameCityError: "المدينة الأصلية والوجهة لا يمكن أن تكونا متشابهتين",
        
        // Schedule Pickup Page
        schedulePickupPageTitle: "جدولة استلام الشحنة",
        schedulePickupSubtitle: "حدد موعداً لاستلام شحنتك من موقعك",
        pickupDetails: "تفاصيل الاستلام",
        labelAddress: "العنوان:",
        labelCity: "المدينة:",
        labelZipCode: "الرمز البريدي:",
        labelPickupDate: "تاريخ الاستلام:",
        labelPickupTime: "وقت الاستلام:",
        selectTime: "اختر الوقت",
        timeMorning1: "8:00 ص - 10:00 ص",
        timeMorning2: "10:00 ص - 12:00 م",
        timeAfternoon1: "12:00 م - 2:00 م",
        timeAfternoon2: "2:00 م - 4:00 م",
        timeEvening: "4:00 م - 6:00 م",
        labelPackageCount: "عدد الطرود:",
        labelInstructions: "تعليمات خاصة (اختياري):",
        pickupAgreement: "أوافق على الشروط والأحكام",
        schedulePickupButton: "جدولة الاستلام",
        pickupFormSuccess: "تم جدولة الاستلام بنجاح! سنتواصل معك لتأكيد الموعد.",
        pickupFormError: "حدث خطأ في جدولة الاستلام. يرجى المحاولة مرة أخرى.",
        pickupAgreementRequired: "يجب الموافقة على الشروط والأحكام",
        pickupDateError: "تاريخ الاستلام لا يمكن أن يكون في الماضي",
        
        // Footer
        companyInfo: "معلومات الشركة",
        addressArabic: "طريق الملك فهد، حي العليا",
        crNumber: "الرقم الموحد:",
        contactUs: "اتصل بنا",
        phone: "الهاتف:",
        email: "البريد الإلكتروني:",
        quickLinks: "روابط سريعة",
        copyright: "جميع الحقوق محفوظة.",
        
        // Language
        langArabic: "العربية",
        langEnglish: "English",
        
        // Authentication
        loginTitle: "تسجيل الدخول",
        labelUsername: "اسم المستخدم:",
        labelPassword: "كلمة المرور:",
        loginButton: "تسجيل الدخول",
        logoutButton: "تسجيل الخروج",
        loginError: "اسم المستخدم أو كلمة المرور غير صحيحة"
    },
    en: {
        // Page Titles
        pageTitle: "AL SAHRA PRECIOUS METALS & LOGISTICS LLC - Track Your Shipment",
        trackingTitle: "Track Shipment - AL SAHRA PRECIOUS METALS",
        adminTitle: "Admin Panel - AL SAHRA PRECIOUS METALS",
        
        // Navigation
        navHome: "Home",
        navTracking: "Track Shipment",
        navZipLookup: "ZIP Code Lookup",
        navCalculatePrice: "Calculate Price",
        navSchedulePickup: "Schedule Pickup",
        navContact: "Contact Us",
        navAdmin: "Admin Panel",
        
        // Header
        tagline: "Reliable Shipping & Delivery Services",
        taglineAdmin: "Admin Panel",
        
        // Home Page
        heroTitle: "Track Your Shipment Easily",
        heroSubtitle: "Enter your tracking number to get the latest updates on your shipment",
        trackPlaceholder: "Enter tracking number",
        trackButton: "Track",
        
        // Services
        servicesTitle: "Our Services",
        serviceFast: "Fast Shipping",
        serviceFastDesc: "Fast and secure shipping service within Saudi Arabia",
        serviceInternational: "International Shipping",
        serviceInternationalDesc: "Transport of precious goods and metals worldwide",
        serviceSecure: "Guaranteed Security",
        serviceSecureDesc: "Complete protection for your shipments with comprehensive insurance",
        serviceRealTime: "Real-Time Tracking",
        serviceRealTimeDesc: "Track your shipment in real-time from anywhere",
        
        // About
        aboutTitle: "About Us",
        aboutText: "AL SAHRA PRECIOUS METALS & LOGISTICS LLC is a leading company in shipping and logistics services in Saudi Arabia. We specialize in transporting precious metals and high-value goods with the highest standards of safety and quality.",
        
        // Tracking Page
        trackingTitle: "Track Your Shipment",
        trackingNumber: "Tracking Number",
        status: "Status",
        location: "Location",
        date: "Date",
        notes: "Notes",
        shipmentDetails: "Shipment Details",
        sender: "Sender",
        recipient: "Recipient",
        weight: "Weight",
        description: "Description",
        errorNotFound: "No shipment found with this number. Please check the tracking number and try again.",
        
        // Status Types
        statusPending: "Pending",
        statusPickedUp: "Picked Up",
        statusInTransit: "In Transit",
        statusOutForDelivery: "Out for Delivery",
        statusDelivered: "Delivered",
        statusException: "Exception",
        
        // Admin Panel
        adminTitle: "Admin Panel - Manage Shipments",
        tabCreate: "Create New Shipment",
        tabManage: "Manage Shipments",
        createTitle: "Create New Shipment",
        labelTrackingNumber: "Tracking Number:",
        labelRecipientName: "Recipient Name:",
        labelRecipientAddress: "Recipient Address:",
        labelSenderName: "Sender Name:",
        labelSenderAddress: "Sender Address:",
        labelWeight: "Weight (kg):",
        labelDescription: "Shipment Description:",
        createButton: "Create Shipment",
        searchPlaceholder: "Search by tracking number...",
        searchButton: "Search",
        noShipments: "No shipments currently",
        notFound: "No shipment found with this number",
        currentStatus: "Current Status:",
        updateCount: "Number of Updates:",
        editStatus: "Edit Status",
        editStatusTitle: "Update Shipment Status",
        addNewStatus: "Add New Status:",
        labelLocation: "Location:",
        labelDateTime: "Date & Time:",
        labelNotes: "Notes:",
        addStatusButton: "Add Status",
        alertFillRequired: "Please fill in all required fields",
        alertTrackingExists: "Tracking number already exists",
        alertCreated: "Shipment created successfully!",
        alertUpdated: "Shipment status updated successfully!",
        editDescriptionTitle: "Edit Shipment Description",
        saveDescription: "Save Description",
        statusNote: "You can select any status, including reverting to a previous status",
        viewHistory: "View History",
        statusHistoryTitle: "Status History",
        deleteStatus: "Delete",
        confirmDelete: "Are you sure you want to delete this status?",
        statusDeleted: "Status deleted successfully",
        editTags: "Edit Tags",
        editTagsTitle: "Edit Tags",
        labelTags: "Tags:",
        tagInputPlaceholder: "Enter tag and press Enter",
        addTag: "Add",
        tags: "Tags",
        tagSuggestions: "Suggestions:",
        saveTags: "Save Tags",
        tagsSaved: "Tags saved successfully",
        
        // Contact Page
        contactPageTitle: "Contact Us",
        contactPageSubtitle: "We're here to help. Contact us through any of the following methods",
        contactFormTitle: "Send us a Message",
        contactInfoTitle: "Contact Information",
        labelName: "Name:",
        labelEmail: "Email:",
        labelPhone: "Phone:",
        labelSubject: "Subject:",
        labelMessage: "Message:",
        selectSubject: "Select Subject",
        subjectGeneral: "General Inquiry",
        subjectTracking: "Tracking Inquiry",
        subjectPricing: "Pricing Inquiry",
        subjectPickup: "Pickup Scheduling",
        subjectComplaint: "Complaint",
        subjectOther: "Other",
        sendMessage: "Send Message",
        contactFormSuccess: "Your message has been sent successfully! We will contact you soon.",
        contactFormError: "Error sending message. Please try again.",
        addressTitle: "Address",
        phoneTitle: "Phone",
        emailTitle: "Email",
        crNumberTitle: "CR Number",
        businessHoursTitle: "Business Hours",
        businessHours: "Saturday - Thursday: 8:00 AM - 6:00 PM<br>Friday: Closed",
        
        // ZIP Lookup Page
        zipLookupPageTitle: "ZIP Code Lookup",
        zipLookupSubtitle: "Search for postal codes of any area in Saudi Arabia",
        zipSearchLabel: "Search by city, area, or postal code:",
        zipSearchPlaceholder: "Example: Riyadh, Jeddah, 11564",
        zipResultsTitle: "Search Results",
        zipNotFound: "No results found",
        popularCitiesTitle: "Popular Cities",
        cityRiyadh: "Riyadh",
        cityJeddah: "Jeddah",
        cityDammam: "Dammam",
        cityMecca: "Mecca",
        cityMedina: "Medina",
        cityKhobar: "Khobar",
        cityTaif: "Taif",
        cityAbha: "Abha",
        selectCity: "Select City",
        
        // Calculate Price Page
        calculatePricePageTitle: "Calculate Shipping Price",
        calculatePriceSubtitle: "Calculate your shipment cost based on weight, dimensions, and shipping method",
        shipmentDetails: "Shipment Details",
        labelOrigin: "Origin City:",
        labelDestination: "Destination City:",
        labelLength: "Length (cm):",
        labelWidth: "Width (cm):",
        labelHeight: "Height (cm):",
        labelServiceType: "Service Type:",
        serviceStandard: "Standard (3-5 days)",
        serviceExpress: "Express (1-2 days)",
        serviceOvernight: "Overnight (24 hours)",
        serviceSecure: "Secured (with insurance)",
        insuranceRequired: "Additional Insurance (1% of declared value)",
        labelDeclaredValue: "Declared Value (SAR):",
        calculateButton: "Calculate Price",
        priceEstimate: "Estimate",
        basePrice: "Base Price:",
        weightCharge: "Weight Charge:",
        distanceCharge: "Distance Charge:",
        serviceCharge: "Service Charge:",
        insuranceCharge: "Insurance Charge:",
        totalPrice: "Total:",
        currency: "SAR",
        priceNote: "* This is an approximate estimate. Final price may vary based on actual shipment details.",
        sameCityError: "Origin and destination cities cannot be the same",
        
        // Schedule Pickup Page
        schedulePickupPageTitle: "Schedule Pickup",
        schedulePickupSubtitle: "Schedule a time for us to pick up your shipment from your location",
        pickupDetails: "Pickup Details",
        labelAddress: "Address:",
        labelCity: "City:",
        labelZipCode: "ZIP Code:",
        labelPickupDate: "Pickup Date:",
        labelPickupTime: "Pickup Time:",
        selectTime: "Select Time",
        timeMorning1: "8:00 AM - 10:00 AM",
        timeMorning2: "10:00 AM - 12:00 PM",
        timeAfternoon1: "12:00 PM - 2:00 PM",
        timeAfternoon2: "2:00 PM - 4:00 PM",
        timeEvening: "4:00 PM - 6:00 PM",
        labelPackageCount: "Number of Packages:",
        labelInstructions: "Special Instructions (optional):",
        pickupAgreement: "I agree to the terms and conditions",
        schedulePickupButton: "Schedule Pickup",
        pickupFormSuccess: "Pickup scheduled successfully! We will contact you to confirm the appointment.",
        pickupFormError: "Error scheduling pickup. Please try again.",
        pickupAgreementRequired: "Please agree to the terms and conditions",
        pickupDateError: "Pickup date cannot be in the past",
        
        // Footer
        companyInfo: "Company Information",
        addressArabic: "طريق الملك فهد، حي العليا",
        crNumber: "CR Number:",
        contactUs: "Contact Us",
        phone: "Phone:",
        email: "Email:",
        quickLinks: "Quick Links",
        copyright: "All rights reserved.",
        
        // Language
        langArabic: "العربية",
        langEnglish: "English",
        
        // Authentication
        loginTitle: "Login",
        labelUsername: "Username:",
        labelPassword: "Password:",
        loginButton: "Login",
        logoutButton: "Logout",
        loginError: "Invalid username or password"
    }
};

// Language management
let currentLang = localStorage.getItem('language') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('lang-' + lang);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    translatePage();
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = translations[currentLang][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // Update page title based on current page
    const path = window.location.pathname;
    let titleKey = 'pageTitle';
    if (path.includes('tracking.html')) {
        titleKey = 'trackingTitle';
    } else if (path.includes('admin.html')) {
        titleKey = 'adminTitle';
    }
    
    if (translations[currentLang] && translations[currentLang][titleKey]) {
        document.title = translations[currentLang][titleKey];
    }
}

// Make setLanguage globally accessible
window.setLanguage = setLanguage;

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang);
    
    // Set active language button
    const activeBtn = document.getElementById('lang-' + currentLang);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
});

