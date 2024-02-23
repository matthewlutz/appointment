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

module.exports = router;

