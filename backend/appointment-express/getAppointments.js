const express = require('express');
const router = express.Router();
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});


router.post("/service-providers/viewAppointments", async (req, res) =>{
    const sql = "SELECT * FROM users WHERE businessId = ?";
    const {id, active} = req.body;
    db.query(sql, id, active, (err, data) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "backend login error" });
        }
        
    })
})

module.exports = router;