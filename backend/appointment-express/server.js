//backend server

const express = require('express');
const cors = require('cors');
const app = express();
const registrationRouter = require('./regBackend');
const loginRouter = require('./backendLogin');
const UsersListRouter = require('./userListBackend');
const businessDetailsRouter = require('./businessDetails');
const bookAppointmentRouter = require('./bookDetails');
const appointmentRouter = require('./appointments');
const addAppointmentRouter = require('./addAppointments');
app.use(express.json());
app.use(cors());

app.use('/api', registrationRouter);
app.use('/api', loginRouter);
app.use('/api', UsersListRouter);
app.use('/api', businessDetailsRouter);
app.use('/api', bookAppointmentRouter);
app.use('/api', appointmentRouter);
app.use('/api', addAppointmentRouter);





const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});