const express = require('express');
const router = express.Router();
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});


/*router.post("/viewUserAppointments", async (req, res) =>{
        const sql = "SELECT * FROM Appointments WHERE userId = ?";
        const id = req.body;
        db.query(sql, [id], (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
    })*/

router.get("/viewUserAppointments", async (req, res) =>{
    const sql = "SELECT * FROM Appointments";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

module.exports = router;