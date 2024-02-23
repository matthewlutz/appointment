const express = require('express');
const router = express.Router();
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});


router.get('/users', async (req, res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

module.exports = router;