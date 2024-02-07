
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});


router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'select * from users where email = ?';
    db.query(query, [email], async (error, results) => {
        if (error) {
            console.error('Error querying the database:', error);
            return res.status(500).json({ message: "backend login error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0]; // Assuming email is unique, there should only be one result

        // Password comparison
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create and assign a token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token: token });
    });
});

module.exports = router;