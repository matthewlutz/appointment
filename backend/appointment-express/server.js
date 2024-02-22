//backend server

const express = require('express');
const cors = require('cors');
const app = express();
const registrationRouter = require('./regBackend');
const loginRouter = require('./backendLogin');
const businessDetailsRouter = require('./businessDetails');

app.use(express.json());
app.use(cors());

app.use('/api', registrationRouter);
app.use('/api', loginRouter);
app.use('/api', businessDetailsRouter);



const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});