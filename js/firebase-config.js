// Firebase Configuration
// TODO: Replace with your Firebase project config
// Get this from: https://console.firebase.google.com → Project Settings → Your apps

const firebaseConfig = {
  apiKey: "AIzaSyA2a-gvIZOWsFHQBsptnqA3ukOw5Irw_LA",
  authDomain: "al-sahra-precious-metals.firebaseapp.com",
  projectId: "al-sahra-precious-metals",
  storageBucket: "al-sahra-precious-metals.firebasestorage.app",
  messagingSenderId: "1023659787588",
  appId: "1:1023659787588:web:7179f96594e2af57f78311",
  measurementId: "G-6VQV0RWVN7"
};

// Initialize Firebase
// Note: Make sure Firebase SDK is loaded before this file
if (typeof firebase !== 'undefined') {
  try {
    // Check if Firebase is already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.firestore();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    window.db = null;
  }
} else {
  console.warn('Firebase SDK not loaded. Using localStorage fallback.');
  window.db = null;
}

