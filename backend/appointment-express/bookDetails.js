//This file takes the booking details sent from the frontend, and validates them and adds them to the appointments table.

const db = require('./appointment-database'); 
const express = require('express');
const router = express.Router();

router.post('/book-appointment', async (req, res) => {
    const { userId, businessId, appointmentStart, appointmentEnd } = req.body;

    
    // Check for overlapping appointments on the business end
    const businessOverlapQuery = 'SELECT * FROM Appointments WHERE businessId = ? AND NOT (appointmentEnd <= ? OR appointmentStart >= ?) LIMIT 1';
    // Check for overlapping appointments on the users end
    const userOverlapQuery = 'SELECT * FROM Appointments WHERE userId = ? AND NOT (appointmentEnd <= ? OR appointmentStart >= ?) LIMIT 1';

    db.query(businessOverlapQuery, [businessId, appointmentStart, appointmentEnd], (error, businessResults) => {
        if(error) {
            return res.status(500).json({ message: 'Error checking business availability' });
        }

        if(businessResults.length > 0) {
            return res.status(400).json({ message: 'Business is not available at the requested time' });
        }

        db.query(userOverlapQuery, [userId, appointmentStart, appointmentEnd], (error, userResults) => {
            if(error) {
                return res.status(500).json({ message: 'Error checking user availability' });
            }

            if(userResults.length > 0) {
                return res.status(400).json({ message: 'User has an overlapping appointment' });
            }

            // If no overlaps, book the appointment
            const insertQuery = 'INSERT INTO Appointments (userId, businessId, appointmentStart, appointmentEnd) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [userId, businessId, appointmentStart, appointmentEnd], (error, insertResult) => {
                if(error) {
                    return res.status(500).json({ message: 'Error booking appointment' });
                }

                res.json({ message: 'Appointment booked successfully' });
            });
        });
    });
});

module.exports = router;
