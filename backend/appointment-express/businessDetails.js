// sends and stores the data from business details form 

const db = require('./appointment-database'); 
const express = require('express');
const router = express.Router();

//This POST saves the details from the frontend business form into the BusinessDetails table
router.post('/business-form', async (req, res) => {
    const { businessName, serviceType, appointmentDuration, appointmentPrice, businessAddress,
         businessDescription, qualifications, email, phone, website } = req.body;

    const query = ` 
        INSERT INTO BusinessDetails
        (businessName, serviceType, appointmentDuration, appointmentPrice, businessAddress, businessDescription, qualifications, email, phone, website)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [businessName, serviceType, appointmentDuration, appointmentPrice, businessAddress, businessDescription, qualifications, email, phone, website], (error, results) => {
        if (error) {
            console.error('Failed to insert business details:', error);
            return res.status(500).send('Error saving business details');
        }
        res.status(201).send('Business details saved successfully');
    });
});

//This get, gets the businessdetails from the BusinessDetails table
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


//This GET, gets the details for a certain BusinessId, and returns them to the fronend
router.get('/business-view/:businessId', async (req, res) => {
    const { businessId } = req.params; // Access the businessId parameter from the URL

    const query = 'SELECT * FROM BusinessDetails WHERE id = ?';

    db.query(query, [businessId], (error, results) => {
        if (error) {
            console.error('Failed to fetch business details:', error);
            return res.status(500).json({ message: 'Error fetching business details' });
        }

       
        if (results.length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).json({ message: 'Business not found' });
        }
    });
});


router.post('/hours', async (req, res) => {
    try {
        const { businessId, hours } = req.body;

        // Begin transaction
        await db.beginTransaction();

        // Prepare statements for inserting or updating hours
        const queries = Object.entries(hours).map(([day, { start: open_time, end: close_time, closed }], index) => {
            // Convert day string to day number, assuming Sunday = 0, Monday = 1, etc.
            const dayNumber = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day.toLowerCase());
            if (dayNumber === -1) throw new Error('Invalid day of week');

            // Generate the SQL for each day's hours
            const query = `
                INSERT INTO business_hours (business_id, day, open_time, close_time) 
                VALUES (?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                open_time = VALUES(open_time), close_time = VALUES(close_time);
            `;
            return db.query(query, [businessId, dayNumber, closed ? null : open_time, closed ? null : close_time]);
        });

        // Execute all queries
        await Promise.all(queries);

        // Commit transaction
        await db.commit();

        res.json({ message: 'Business hours updated successfully' });

    } catch (error) {
        // Rollback transaction in case of error
        await db.rollback();

        console.error('Failed to update business hours:', error);
        res.status(500).json({ message: 'Error updating business hours' });
    }
})

module.exports = router;

