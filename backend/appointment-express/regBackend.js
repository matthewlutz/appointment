const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./appointment-database'); 
const router = express.Router();
const jwt = require('jsonwebtoken');
const { default: userEvent } = require('@testing-library/user-event');


router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const checkUserQuery = 'SELECT email FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (error, results) => {
        if (error) {
            console.error('Error querying the database:', error);
            return res.status(500).json({ message: 'Error checking user existence' });
        }

        if (results.length > 0) {
            // User already exists
            return res.status(409).json({ message: 'User with this email already exists' });
        } else {
            // No user exists, proceed with registration
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const insertQuery = 'INSERT INTO users (name, email, password, role, active) VALUES (?, ?, ?, ?, ?)';
                db.query(insertQuery, [name, email, hashedPassword, role, 1], (error, results) => {
                    if (error) {
                        console.error('Error inserting user into database:', error);
                        return res.status(500).json({ message: 'Error registering user' });
                    }
                    const newUserId = results.insertId; // Get the ID of the newly inserted user
                    const token = jwt.sign({ userId: newUserId, role: role, email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(201).json({ message: 'User registered successfully', role: role, token: token});
                });

            } catch (error) {
                console.error('Error during registration:', error);
                res.status(500).json({ message: 'Server error' });
            }
        }
    });
});

module.exports = router;
