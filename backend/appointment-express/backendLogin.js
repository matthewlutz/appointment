
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user'); //may need to fix

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user.findOne({ where: { email } });
        if (!user) {
            //user is not in database
            return res.status(404).send('User not found');
        }


        //password comparison
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(400).send('Invalid password');
        }

        //create and assign a token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({message :'Login successful', token});
    

    } catch (error) {
        res.status(500).json({ message: "backend login error" });
    }
}