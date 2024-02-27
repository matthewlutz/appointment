// sends and stores the data from business details form 

const db = require('./appointment-database'); 
const express = require('express');
const router = express.Router();

router.post('/business-form', async (req, res) => {
    const { businessName, serviceType, appointmentDuration, appointmentPrice, businessAddress,
         businessDescription, email, phone, website } = req.body;

    const query = ` 
        INSERT INTO BusinessDetails
        (businessName, serviceType, appointmentDuration, appointmentPrice, businessAddress, businessDescription, email, phone, website)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [businessName, serviceType, appointmentDuration, appointmentPrice, businessAddress, businessDescription, email, phone, website], (error, results) => {
        if (error) {
            console.error('Failed to insert business details:', error);
            return res.status(500).send('Error saving business details');
        }
        res.status(201).send('Business details saved successfully');
    });

});


router.get('/business-details', async (req, res) => {
    const query = 'SELECT * FROM BusinessDetails';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Failed to fetch business details:', error);
            return res.status(500).json({ message: 'Error fetching business details' });
        }
        res.json(results);
    });
});

router.get('/business-view/:businessId', async (req, res) => {
    const { businessId } = req.params; // Access the businessId parameter from the URL

    // Assuming 'id' is the column name for the business ID in your BusinessDetails table
    const query = 'SELECT * FROM BusinessDetails WHERE id = ?';

    db.query(query, [businessId], (error, results) => {
        if (error) {
            console.error('Failed to fetch business details:', error);
            return res.status(500).json({ message: 'Error fetching business details' });
        }

        // Since the query might return multiple results but we expect only one,
        // we select the first result if available.
        if (results.length > 0) {
            res.json(results[0]); // Send back the first (and presumably only) business details
        } else {
            res.status(404).json({ message: 'Business not found' });
        }
    });
});

module.exports = router;

