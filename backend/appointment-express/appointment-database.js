//This is the file that links the aws db to the express server
require('dotenv').config({ path: './names.env'}); 

const mysql = require('mysql');
//real values aer hidden in a .env file
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,  
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Successfully connected to the database.');
});

module.exports = connection;