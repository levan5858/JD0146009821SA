# AL SAHRA PRECIOUS METALS & LOGISTICS LLC - Tracking Website

A modern shipping tracking website similar to USPS, customized for AL SAHRA PRECIOUS METALS & LOGISTICS LLC with a green theme.

## Features

- **Home Page**: Welcome page with tracking form and company information
- **Tracking Page**: Real-time shipment tracking with timeline visualization
- **Admin Panel**: Create and manage shipments, update shipping statuses manually
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Arabic RTL Support**: Full right-to-left layout for Arabic content

## Company Information

- **Name**: AL SAHRA PRECIOUS METALS & LOGISTICS LLC
- **Address**: King Fahd Road, Al Olaya District
- **Phone**: +966 11 487 2290
- **Email**: export@alsahrapml.com
- **CR Number**: 1010894457
- **Domain**: alsahrapml.com

## Local Hosting Instructions

### Option 1: Python HTTP Server (Recommended)

1. Open Terminal/Command Prompt
2. Navigate to the project directory:
   ```bash
   cd "/Users/work1/Desktop/AL SAHRA PRECIOUS METALS"
   ```

3. For Python 3:
   ```bash
   python3 -m http.server 8000
   ```

   For Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

### Option 2: Node.js HTTP Server

1. Install http-server globally (if not already installed):
   ```bash
   npm install -g http-server
   ```

2. Navigate to the project directory:
   ```bash
   cd "/Users/work1/Desktop/AL SAHRA PRECIOUS METALS"
   ```

3. Start the server:
   ```bash
   http-server -p 8000
   ```

4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Opening

Simply double-click `index.html` to open it in your default browser. Note: Some features may not work perfectly due to browser security restrictions with localStorage when opening files directly.

## Usage Guide

### For Customers

1. Visit the home page
2. Enter your tracking number in the search box
3. Click "تتبع" (Track) or press Enter
4. View your shipment status and timeline

### For Administrators

1. Navigate to "لوحة التحكم" (Admin Panel)
2. **Create New Shipment**:
   - Click "إنشاء شحنة جديدة" (Create New Shipment)
   - Fill in all required fields
   - Click "إنشاء الشحنة" (Create Shipment)

3. **Manage Shipments**:
   - Click "إدارة الشحنات" (Manage Shipments)
   - Search for a shipment by tracking number
   - Click "تعديل الحالة" (Edit Status) to update shipment status
   - Add new status updates with location, date/time, and notes

## Shipment Status Types

- **قيد الانتظار** (Pending): Shipment created, awaiting pickup
- **تم الاستلام** (Picked Up): Shipment collected from sender
- **قيد النقل** (In Transit): Shipment in transit
- **قيد التوصيل** (Out for Delivery): Shipment out for delivery
- **تم التسليم** (Delivered): Shipment delivered
- **استثناء** (Exception): Exception or issue with shipment

## Data Storage

The website currently uses browser **localStorage** to store shipment data. This means:
- Data persists in your browser
- Data is local to each browser/device
- Data will be lost if browser data is cleared

**For Production**: You should integrate with a backend database (MySQL, PostgreSQL, MongoDB, etc.) and create API endpoints for data management.

## File Structure

```
AL SAHRA PRECIOUS METALS/
├── index.html          # Home page
├── tracking.html       # Tracking page
├── admin.html          # Admin panel
├── logo.svg            # Company logo
├── css/
│   └── style.css       # Stylesheet with green theme
├── js/
│   ├── main.js         # Main page functionality
│   ├── tracking.js     # Tracking functionality
│   └── admin.js        # Admin panel functionality
└── README.md           # This file
```

## Customization

### Changing Colors

Edit `css/style.css` and modify the CSS variables in the `:root` selector:

```css
:root {
    --primary-green: #2d5016;      /* Dark green */
    --secondary-green: #4a7c2a;    /* Medium green */
    --light-green: #6b9f3d;        /* Light green */
    --lighter-green: #8bc34a;      /* Lighter green */
    --accent-green: #a5d75f;       /* Accent green */
}
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend API integration
- Database storage
- User authentication for admin panel
- Email notifications
- SMS notifications
- Multi-language support
- PDF shipping labels
- Bulk shipment import
- Analytics dashboard

## Support

For issues or questions, contact:
- Email: export@alsahrapml.com
- Phone: +966 11 487 2290

## License

© 2024 AL SAHRA PRECIOUS METALS & LOGISTICS LLC. All rights reserved.


