const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userQuery, [email], async (error, usersResults) => {
        if (error) {
            console.error('Error querying the database:', error);
            return res.status(500).json({ message: "backend login error" });
        }

        if (usersResults.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = usersResults[0]; // Assuming email is unique

        // Password comparison
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Here, determine if the user is a service provider
        if (user.role === 'service-provider') {
            const businessDetailsQuery = 'SELECT id FROM BusinessDetails WHERE email = ?';
            db.query(businessDetailsQuery, [email], (error, businessResults) => {
                if (error) {
                    console.error('Error querying the businessDetails:', error);
                    return res.status(500).json({ message: "Error fetching business details" });
                }

                if (businessResults.length > 0) {
                    const businessId = businessResults[0].id;
                    const token = jwt.sign({ userId: user.id, email, businessId }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({ message: 'Login successful', token: token });
                } else {
                    // Handle case where no matching business details are found
                    return res.status(404).json({ message: "No matching business details found" });
                }
            });
        } else {
            // If the user is not a service provider, proceed as normal
            const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token: token });
        }
    });
});

module.exports = router;