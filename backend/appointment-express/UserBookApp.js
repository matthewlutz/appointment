const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./appointment-database');
require('dotenv').config({ path: './jsontoken.env'});

router.post("/", async (req, res) =>{

});