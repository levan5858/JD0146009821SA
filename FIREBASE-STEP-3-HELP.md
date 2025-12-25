# Step 3 Help - Getting Firebase Config

## You're at the Right Place!

After clicking "Register app", Firebase shows you SDK installation options. **You can skip this!** The SDK is already added to your website.

## What You Need: Just the Config Values

Instead of adding the SDK, you need to **copy the configuration values** from the page.

### Option 1: Copy from the Code Block

On the Firebase page, you should see a code block that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**Just copy the VALUES inside the quotes** (not the whole code block).

### Option 2: Get from Project Settings

If you don't see the config on that page:

1. **Click "Continue to console"** (or just close that page)
2. **Click the gear icon** ⚙️ (top left)
3. **Click "Project settings"**
4. **Scroll down** to "Your apps" section
5. **Click on your web app** (the one you just created)
6. You'll see the config values there

### Option 3: Manual Copy

Look for these values on the page:
- **apiKey** - Long string starting with "AIza"
- **authDomain** - Something like "your-project.firebaseapp.com"
- **projectId** - Your project name
- **storageBucket** - Something like "your-project.appspot.com"
- **messagingSenderId** - A number
- **appId** - A long string with colons

---

## Next: Add to Your Website

Once you have these values:

1. **Open:** `js/firebase-config.js` in your project
2. **Replace** the placeholder values with your actual values
3. **Save** the file

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // Your actual API key
  authDomain: "alsahra-precious-metals.firebaseapp.com",  // Your actual domain
  projectId: "alsahra-precious-metals",  // Your actual project ID
  storageBucket: "alsahra-precious-metals.appspot.com",  // Your actual storage bucket
  messagingSenderId: "123456789012",  // Your actual sender ID
  appId: "1:123456789012:web:abcdef1234567890"  // Your actual app ID
};
```

---

## Important Notes

✅ **You DON'T need to add the script tags** - I already added them!
✅ **You DON'T need npm** - This is a static website
✅ **You just need the config values** - Copy them from Firebase

---

## Still Can't Find It?

If you can't see the config:

1. Go to: https://console.firebase.google.com
2. Select your project
3. Click **gear icon** ⚙️ → **Project settings**
4. Scroll to **"Your apps"** section
5. You should see your web app listed
6. Click on it to see the config

---

**Once you have the config values, paste them into `js/firebase-config.js` and you're done with Step 3!**




