const express = require('express');
const router = express.Router();
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});


router.get('/users', async (req, res)=>{ // this will get all the user data from the database
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

/*router.post("/users", async (req, res) =>{ // should have an id put in to it change the active setting for the id
    const sql = "UPDATE users SET active = ? WHERE id = ?";
    const {id, active} = req.body;
    db.query(sql, id, active, (err, data) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: "backend login error" });
        }
        
    })
})*/

module.exports = router;