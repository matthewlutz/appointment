const db = require('./appointment-database'); 
const express = require('express');
const router = express.Router();

router.post('/addAppointments', (req, res) => {
    const { date, time, purpose, businessId } = req.body;
  
    if (!date || !time || !businessId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const IsBooked = false; 
  
    const sql = `
      INSERT INTO Appointments (businessId, appointmentStart, appointmentEnd, Purpose, IsBooked)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    
    const appointmentStart = new Date(date + ' ' + time);
    const appointmentEnd = new Date(appointmentStart.getTime() + 30);

    db.query(sql, [businessId, appointmentStart, appointmentEnd, purpose, IsBooked], (err, result) => {
      if (err) {
        console.error('Failed to add appointment:', err);
        return res.status(500).json({ message: 'Failed to add appointment' });
      }
      res.status(201).json({ message: 'Appointment added successfully', appointmentId: result.insertId });
    });
  });



module.exports = router;