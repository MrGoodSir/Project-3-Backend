///////////////////////////////
// DEPENDENCIES
//////////////////////////////
require('dotenv').config();
const { PORT = 3001 } = process.env;
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const DATABASE_URL = process.env.DATABASE_URL


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


const MobSchema = new mongoose.Schema({
    name: String,
    health: Number,
    damage: Number,
    armor: Number,
    image: String,
})


///////////////////////////////
// MIDDLEWARE
///////////////////////////////


app.use(cors()); // to prevent cors errors, open acces to all origins
app.use(morgan('dev')); // logging
app.use(express.json()); // parse json bodies


///////////////////////////////
// ROUTES
///////////////////////////////

// Test Start Route
app.get('/', (req, res) => {
    res.send('This is the start page')
})

// Mob Seed Route
app.get('/seed', (req, res) => {
    Mob.deleteMany({}, (error, allMobs) => {})

    Mob.create(mobSeed, (error, data) => {
        res.redirect('/home')
    })
})

// Mob Index Route
app.get('/home', async (req, res) => {
    try {
        res.json(await Mob.find({}))
    } catch (error) {
        alert("Man, you really jacked something up...")
    }
})


// Mob Create Route
app.post('/home', async (req, res) => {
    try{
        res.json(await Mob.create(req.body));
    } catch (error) {
        alert("It broke. What on Earth did you do...?")
    }
})



///////////////////////////////
// LISTENER
///////////////////////////////


app.listen(PORT, () => console.log(`Port ${PORT} is up and running...`))