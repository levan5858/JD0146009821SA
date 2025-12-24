// Translation system for AL SAHRA PRECIOUS METALS website

const translations = {
    ar: {
        // Page Titles
        pageTitle: "AL SAHRA PRECIOUS METALS & LOGISTICS LLC - Track Your Shipment",
        trackingTitle: "تتبع الشحنة - AL SAHRA PRECIOUS METALS",
        adminTitle: "لوحة التحكم - AL SAHRA PRECIOUS METALS",
        
        // Navigation
        // Navigation
        navHome: "الرئيسية",
        navTracking: "تتبع الشحنة",
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

