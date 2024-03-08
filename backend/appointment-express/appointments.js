//This file fetches the appointments for a given business
const db = require('./appointment-database'); 
const express = require('express');
const router = express.Router();


//Defines the GET 
router.get('/appointments:businessId', async (req, res) => { //gets appointments for the unique businessId
    const { businessId } = req.params();

    try{
        const query = 'SELECT * FROM appointments WHERE businessId = ?'; //db query
        const values = [businessId];

        db.query(query, values, (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error retrieving appointments', error: error });
            }
            
            res.status(200).json(results)
        })

    }catch(error){
        res.status(500).json({ message: 'Server error', error: error });

    }
})

router.get('/appointmentSlots/:businessId', async (req, res) => {
    const { businessId } = req.params;

    try{
        const query = 'SELECT * FROM Appointments WHERE businessId = ? AND IsBooked = 0';
        const values = [businessId];

        db.query(query, values, (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error retrieving appointments', error: error });
            }
            
            res.status(200).json(results)
        })

    }catch(error){
        res.status(500).json({ message: 'Server error', error: error });

    }
})

module.exports = router;
