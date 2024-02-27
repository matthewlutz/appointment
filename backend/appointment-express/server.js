//backend server

const express = require('express');
const cors = require('cors');
const app = express();
const registrationRouter = require('./regBackend');
const loginRouter = require('./backendLogin');
const UsersListRouter = require('./userListBackend');
const businessDetailsRouter = require('./businessDetails');
const getAppointmentsRouter = require('./getAppointments');
app.use(express.json());
app.use(cors());

app.use('/api', registrationRouter);
app.use('/api', loginRouter);
app.use('/api', UsersListRouter);
app.use('/api', businessDetailsRouter);
app.use('/api', getAppointmentsRouter);




const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});