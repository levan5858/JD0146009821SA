// Database service - Replaces localStorage with Firebase Firestore

// Check if Firebase is available
const useFirebase = typeof firebase !== 'undefined' && window.db;

// Database functions
const database = {
    // Get a shipment by tracking number
    async getShipment(trackingNumber) {
        if (!trackingNumber) return null;
        
        // Normalize tracking number
        const normalizedTracking = trackingNumber.trim().toUpperCase();
        
        if (useFirebase) {
            try {
                // Try exact match first
                let doc = await window.db.collection('shipments').doc(normalizedTracking).get();
                if (doc.exists) {
                    return doc.data();
                }
                
                // If not found, try case-insensitive search
                const snapshot = await window.db.collection('shipments').get();
                for (const docSnap of snapshot.docs) {
                    const data = docSnap.data();
                    if (data.trackingNumber && data.trackingNumber.toUpperCase() === normalizedTracking) {
                        return data;
                    }
                }
                
                return null;
            } catch (error) {
                console.error('Error getting shipment:', error);
                console.error('Tracking number searched:', normalizedTracking);
                return null;
            }
        } else {
            // Fallback to localStorage
            const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
            // Try exact match
            if (shipments[normalizedTracking]) {
                return shipments[normalizedTracking];
            }
            // Try case-insensitive search
            for (const key in shipments) {
                if (key.toUpperCase() === normalizedTracking) {
                    return shipments[key];
                }
            }
            return null;
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
    },

    // Delete a shipment
    async deleteShipment(trackingNumber) {
        if (!trackingNumber) return false;
        
        const normalizedTracking = trackingNumber.trim().toUpperCase();
        
        if (useFirebase) {
            try {
                await window.db.collection('shipments').doc(normalizedTracking).delete();
                return true;
            } catch (error) {
                console.error('Error deleting shipment:', error);
                return false;
            }
        } else {
            // Fallback to localStorage
            const shipments = JSON.parse(localStorage.getItem('shipments') || '{}');
            delete shipments[normalizedTracking];
            localStorage.setItem('shipments', JSON.stringify(shipments));
            return true;
        }
    }
};

// Make database available globally
window.database = database;


