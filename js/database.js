// Database service - Replaces localStorage with Firebase Firestore

// Check if Firebase is available
const useFirebase = typeof firebase !== 'undefined' && window.db;

// Database functions
const database = {
    // Get a shipment by tracking number
    async getShipment(trackingNumber) {
        if (useFirebase) {
            try {
                const doc = await window.db.collection('shipments').doc(trackingNumber).get();
                if (doc.exists) {
                    return doc.data();
                }
                return null;
            } catch (error) {
                console.error('Error getting shipment:', error);
                return null;
            }
        } else {
            // Fallback to localStorage
            const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
            return shipments[trackingNumber] || null;
        }
    },

    // Get all shipments
    async getAllShipments() {
        if (useFirebase) {
            try {
                const snapshot = await window.db.collection('shipments').get();
                const shipments = {};
                snapshot.forEach(doc => {
                    shipments[doc.id] = doc.data();
                });
                return shipments;
            } catch (error) {
                console.error('Error getting shipments:', error);
                return {};
            }
        } else {
            // Fallback to localStorage
            return JSON.parse(localStorage.getItem('shipments') || '{}');
        }
    },

    // Save a shipment
    async saveShipment(shipment) {
        if (useFirebase) {
            try {
                await window.db.collection('shipments').doc(shipment.trackingNumber).set(shipment);
                return true;
            } catch (error) {
                console.error('Error saving shipment:', error);
                alert('Error saving shipment. Please try again.');
                return false;
            }
        } else {
            // Fallback to localStorage
            const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
            shipments[shipment.trackingNumber] = shipment;
            localStorage.setItem('shipments', JSON.stringify(shipments));
            return true;
        }
    },

    // Update a shipment
    async updateShipment(trackingNumber, shipment) {
        if (useFirebase) {
            try {
                // Use set with merge to properly update arrays
                await window.db.collection('shipments').doc(trackingNumber).set(shipment, { merge: false });
                return true;
            } catch (error) {
                console.error('Error updating shipment:', error);
                alert('Error updating shipment. Please try again.');
                return false;
            }
        } else {
            // Fallback to localStorage
            const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
            shipments[trackingNumber] = shipment;
            localStorage.setItem('shipments', JSON.stringify(shipments));
            return true;
        }
    },

    // Check if tracking number exists
    async trackingNumberExists(trackingNumber) {
        if (useFirebase) {
            try {
                const doc = await window.db.collection('shipments').doc(trackingNumber).get();
                return doc.exists;
            } catch (error) {
                console.error('Error checking tracking number:', error);
                return false;
            }
        } else {
            // Fallback to localStorage
            const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
            return !!shipments[trackingNumber];
        }
    }
};

// Make database available globally
window.database = database;


