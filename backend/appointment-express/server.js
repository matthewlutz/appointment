
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post(/api/register, async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;
    try{
        //register logic goes here

        res.status(201).json({ message: 'Registration successful' });
    }catch (error){
        //handle errors
        res.status(500).json({ message: 'Registration failed' });
    }
});
