///////////////////////////////
// DEPENDENCIES
///////////////////////////////


// Get .env variables
require('dotenv').config();

// Pull PORT from .env, give default value of 3001
const { PORT = 3001 } = process.env;

// Import Mongoose and Express
const express = require('express');
const mongoose = require('mongoose')

// Create application object
const app = express();


///////////////////////////////
// DATABASE CONNECTION
///////////////////////////////

// Establish Connection
mongoose.connect(DATABASE_URL)

//Connection Events
mongoose.connection
    .on('open', () => console.log("Connected to MongoDB"))
    .on('close', () => console.log("Couldn't connect to MongoDB"))
    .on('error', () => console.log(error));


///////////////////////////////
// ROUTES
///////////////////////////////


app.get('/', (req, res) => {
    res.send('Hello World')
})


///////////////////////////////
// LISTENER
///////////////////////////////


app.listen(PORT, () => console.log(`Port ${PORT} is up and running...`))