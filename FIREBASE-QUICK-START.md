# Firebase Quick Start - Step by Step

Follow these steps exactly to set up Firebase for your website.

---

## Step 1: Create Firebase Account & Project

### 1.1 Go to Firebase Console
- Open: https://console.firebase.google.com
- Sign in with your Google account (or create one if needed)

### 1.2 Create New Project
- Click **"Add project"** or **"Create a project"** button
- **Project name:** `alsahra-precious-metals` (or any name you like)
- Click **"Continue"**
- **Google Analytics:** You can disable this (toggle OFF) or leave it on
- Click **"Create project"**
- Wait 30-60 seconds for setup
- Click **"Continue"** when done

---

## Step 2: Enable Firestore Database

### 2.1 Open Firestore
- In the left sidebar, click **"Firestore Database"**
- Click **"Create database"** button

### 2.2 Choose Mode
- Select **"Start in test mode"** (we'll secure it later)
- Click **"Next"**

### 2.3 Choose Location
- Select a location close to Saudi Arabia:
  - **Recommended:** `europe-west1` (Belgium) or `asia-south1` (Mumbai)
- Click **"Enable"**
- Wait 30 seconds for database to be created

---

## Step 3: Get Your Firebase Configuration

### 3.1 Open Project Settings
- Click the **gear icon** ⚙️ (top left, next to "Project Overview")
- Click **"Project settings"**

### 3.2 Add Web App
- Scroll down to **"Your apps"** section
- Click the **web icon** `</>` (or "Add app" → Web)
- **App nickname:** `AL SAHRA Website`
- **DO NOT check** "Also set up Firebase Hosting"
- Click **"Register app"**

### 3.3 Copy Configuration
You'll see a code block that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "alsahra-precious-metals.firebaseapp.com",
  projectId: "alsahra-precious-metals",
  storageBucket: "alsahra-precious-metals.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**COPY THIS ENTIRE CONFIG OBJECT** - You'll need it in the next step!

---

## Step 4: Add Config to Your Website

### 4.1 Open firebase-config.js
- In your project, open: `js/firebase-config.js`

### 4.2 Replace the Config
- Find this section:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ...
};
```

- **Replace it** with the config you copied from Firebase
- **Save the file**

---

## Step 5: Set Security Rules (Important!)

### 5.1 Open Firestore Rules
- In Firebase Console, go to **"Firestore Database"**
- Click **"Rules"** tab (at the top

### 5.2 Update Rules
- **Delete** the existing rules
- **Paste** this code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shipments/{trackingNumber} {
      // Allow anyone to read (for tracking)
      allow read: if true;
      // Allow anyone to write (for now - we'll secure later)
      allow write: if true;
    }
  }
}
```

- Click **"Publish"** button

**Note:** This allows public read/write. For production, you should add authentication later.

---

## Step 6: Deploy to GitHub

### 6.1 Commit Your Changes
Open Terminal in your project folder and run:

```bash
cd "/Users/work1/Desktop/AL SAHRA PRECIOUS METALS"
git add .
git commit -m "Add Firebase configuration"
git push
```

### 6.2 Wait for Deployment
- Wait 2-3 minutes for GitHub Pages to update
- Your site will automatically use Firebase now!

---

## Step 7: Test It!

### 7.1 Test Creating a Shipment
1. Go to your website
2. Login to admin panel (WEALTHY / Wealth12##)
3. Create a test shipment
4. **Refresh the page** - shipment should still be there! ✅

### 7.2 Test Tracking
1. Copy the tracking number
2. Open tracking page
3. Enter tracking number
4. It should show the shipment! ✅

### 7.3 Test from Different Device
1. Open your website on phone or different browser
2. Try tracking the same shipment
3. It should work! ✅

---

## Troubleshooting

### "Firebase not initialized" Error
- **Check:** Did you add your Firebase config to `firebase-config.js`?
- **Check:** Are Firebase scripts loading? (Open browser console F12)

### "Permission denied" Error
- **Check:** Did you publish the security rules?
- **Check:** Rules should allow `read: if true` and `write: if true`

### Data Not Saving
- **Check:** Open browser console (F12) for errors
- **Check:** Firebase project is active in console
- **Check:** Firestore database is enabled

### Still Using localStorage
- **Check:** Firebase config is correct
- **Check:** Firebase scripts are loading (check Network tab in browser)
- **Check:** No JavaScript errors in console

---

## What's Next?

After Firebase is working:

1. ✅ **Test thoroughly** - Create shipments, track them, update status
2. 🔒 **Add authentication** - Secure admin panel with Firebase Auth
3. 🔐 **Update security rules** - Restrict writes to authenticated users only
4. 📊 **Monitor usage** - Check Firebase console for usage stats

---

## Need Help?

If you get stuck:
1. Check browser console (F12) for errors
2. Verify Firebase config is correct
3. Make sure Firestore is enabled
4. Check security rules are published

**Your shipments will now save permanently and be accessible from anywhere!** 🎉





