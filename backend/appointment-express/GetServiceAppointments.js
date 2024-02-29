const express = require('express');
const router = express.Router();
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});


router.post("/viewServiceAppointments", async (req, res) =>{
        const sql = "SELECT * FROM Appointments WHERE bussinessId = ?";
        const id = req.body;
        db.query(sql, [id], (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
    })

module.exports = router;