# Firebase Setup Guide - Fix Shipment Saving Issue

## Problem
Your website uses `localStorage` which only saves data in the browser. On GitHub Pages, each user has their own localStorage, so shipments don't persist across devices or browsers.

## Solution: Firebase Firestore (FREE Database)

Firebase is Google's free database service that will make your shipments save permanently and be accessible from anywhere.

---

## Step 1: Create Firebase Project

1. **Go to:** https://console.firebase.google.com
2. **Click "Add project"** or "Create a project"
3. **Enter project name:** `alsahra-precious-metals` (or any name)
4. **Disable Google Analytics** (optional, you can enable later)
5. **Click "Create project"**
6. **Wait for setup** (30 seconds)

---

## Step 2: Enable Firestore Database

1. **In Firebase Console**, click **"Firestore Database"** (left menu)
2. **Click "Create database"**
3. **Start in test mode** (for now - we'll secure it later)
4. **Choose location:** Select closest to Saudi Arabia (e.g., `europe-west1` or `asia-south1`)
5. **Click "Enable"**

---

## Step 3: Get Firebase Configuration

1. **In Firebase Console**, click the **gear icon** ⚙️ (top left)
2. **Click "Project settings"**
3. **Scroll down to "Your apps"**
4. **Click the web icon** `</>` (or "Add app" → Web)
5. **Register app:**
   - App nickname: `AL SAHRA Website`
   - **Don't check** "Also set up Firebase Hosting"
   - Click **"Register app"**
6. **Copy the config object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

7. **Save this config** - you'll need it in the next step!

---

## Step 4: Update Your Website Files

I've created the Firebase integration files. You just need to:

1. **Add your Firebase config** to `js/firebase-config.js`
2. **Commit and push** to GitHub

---

## Step 5: Security Rules (Important!)

1. **In Firebase Console**, go to **Firestore Database** → **Rules**
2. **Replace the rules** with this (allows read/write for now):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shipments/{trackingNumber} {
      allow read: if true;  // Anyone can read (for tracking)
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

**For now, use test mode** (allows all reads/writes):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. **Click "Publish"**

---

## Step 6: Deploy to GitHub

1. **Add your Firebase config** to `js/firebase-config.js`
2. **Commit all files:**
   ```bash
   git add .
   git commit -m "Add Firebase integration"
   git push
   ```
3. **Wait 2-3 minutes** for GitHub Pages to update
4. **Test your website!**

---

## Testing

1. **Go to your website**
2. **Login to admin panel** (WEALTHY / Wealth12##)
3. **Create a test shipment**
4. **Check if it saves** (refresh page - it should still be there!)
5. **Try tracking** the shipment from a different browser/device
6. **It should work!** ✅

---

## Firebase Free Tier Limits

- **50,000 reads/day** - More than enough for your site
- **20,000 writes/day** - Plenty for shipments
- **1 GB storage** - Way more than you need
- **FREE forever** (unless you exceed limits)

---

## Troubleshooting

**"Firebase not initialized" error:**
- Check if `firebase-config.js` has your correct config
- Make sure Firebase scripts are loaded before your JS files

**"Permission denied" error:**
- Check Firestore security rules
- Make sure rules allow read/write

**Data not saving:**
- Check browser console for errors (F12)
- Verify Firebase project is active
- Check Firestore database is enabled

---

## Next Steps (Optional)

1. **Add authentication** (Firebase Auth) for better security
2. **Set up proper security rules** (restrict writes to admins only)
3. **Add real-time updates** (shipments update automatically)
4. **Add analytics** to track usage

---

**After setup, your shipments will save permanently and be accessible from any device!** 🎉





