const db = require('./appointment-database'); 
const express = require('express');
const router = express.Router();

//Defines the POST route for adding appointments
router.post('/addAppointments', (req, res) => {
    const { date, time, purpose, businessId } = req.body;
  
    //validates fields
    if (!date || !time || !businessId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const IsBooked = false; 
  
    //db query string
    const sql = `
      INSERT INTO Appointments (businessId, appointmentStart, appointmentEnd, Purpose, IsBooked)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    
    const appointmentStart = new Date(date + ' ' + time);
    const appointmentEnd = new Date(appointmentStart.getTime() + 30);

    db.query(sql, [businessId, appointmentStart, appointmentEnd, purpose, IsBooked], (err, result) => {
      if (err) { //query failed
        console.error('Failed to add appointment:', err);
        return res.status(500).json({ message: 'Failed to add appointment' });
      } //query successful
      res.status(201).json({ message: 'Appointment added successfully', appointmentId: result.insertId });
    });
  });



module.exports = router;