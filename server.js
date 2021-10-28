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


const EnemySchema = new mongoose.Schema({
    name: String,
    health: Number,
    damage: Number,
    armor: Number,
    image: String,
})

const HumanSchema = new mongoose.Schema({
    name: String,
    health: Number,
    damage: Number,
    image: String,
})

const AnimalSchema = new mongoose.Schema({
    name: String,
    health: Number,
    behavior: String,
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

// Test Home Route
app.get('/home', (req, res) => {
    res.send('This is the Home page')
})

// Enemy Seed Route
app.get('/home/seed', (req, res) => {
    Enemy.deleteMany({}, (error, allEnemies) => {})

    Enemy.create(enemySeed, (error, data) => {
        res.redirect('/home/enemy')
    })
})

// Enemy Index Route
app.get('/home/enemy', async (req, res) => {
    try {
        res.json(await Enemy.find({}))
    } catch (error) {
        alert("Man, you really jacked something up...")
    }
})


// Enemy Create Route
app.post('/home/enemy', async (req, res) => {
    try{
        res.json(await Enemy.create(req.body));
    } catch (error) {
        alert("It broke. What on Earth did you do...?")
    }
})

// Human Seed Route
app.get('/home/seed', (req, res) => {
    Human.deleteMany({}, (error, allHumans) => {})

    Human.create(humanSeed, (error, data) => {
        res.redirect('/home/human')
    })
})

// Human Index Route
app.get('/home/human', async (req, res) => {
    try {
        res.json(await Human.find({}))
    } catch (error) {
        alert("Man, you really jacked something up...")
    }
})


// Human Create Route
app.post('/home/human', async (req, res) => {
    try{
        res.json(await Human.create(req.body));
    } catch (error) {
        alert("It broke. What on Earth did you do...?")
    }
})

// Animal Seed Route
app.get('/home/seed', (req, res) => {
    Animal.deleteMany({}, (error, allAnimals) => {})

    Animal.create(animalSeed, (error, data) => {
        res.redirect('/home/animal')
    })
})

// Animal Index Route
app.get('/home/animal', async (req, res) => {
    try {
        res.json(await Animal.find({}))
    } catch (error) {
        alert("Man, you really jacked something up...")
    }
})


// Animal Create Route
app.post('/home/animal', async (req, res) => {
    try{
        res.json(await Animal.create(req.body));
    } catch (error) {
        alert("It broke. What on Earth did you do...?")
    }
})

///////////////////////////////
// LISTENER
///////////////////////////////


app.listen(PORT, () => console.log(`Port ${PORT} is up and running...`))