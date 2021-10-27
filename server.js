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

// Import Middleware
const cors = require('cors');
const morgan = require('morgan')


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
// MODELS
///////////////////////////////


const EnemySchema = new mongoose.Schema({
    name: String,
    health: Number,
    damage: Number,
    id: Number, 
    speed: Number
})


///////////////////////////////
// MIDDLEWARE
///////////////////////////////





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