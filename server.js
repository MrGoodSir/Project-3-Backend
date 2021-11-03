///////////////////////////////
// DEPENDENCIES
//////////////////////////////
require('dotenv').config();
const { DATABASE_URL, PORT = 3001 } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


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


const Schema = mongoose.Schema;

const MobsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    health: { type: Number, required: true },
    damage: { type: Number, required: true },
    armor: { type: Number, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

const Mobs = mongoose.model('Mobs', MobsSchema)


///////////////////////////////
// MIDDLEWARE
///////////////////////////////


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


///////////////////////////////
// ROUTES
///////////////////////////////

// Test Start Route
app.get('/', (req, res) => {
    res.send('This is the start page')
})

// // Mob Seed Route
// app.get('/seed', (req, res) => {
//     Mobs.deleteMany({}, (error, allMobs) => {})

//     Mobs.create(mobSeed, (error, data) => {
//         res.redirect('/mobs')
//     })
// })

// Mob Index Route
app.get('/mobs', async (req, res) => {
    try {
        res.json(await Mobs.find({}))
    } catch (error) {

        res.status(400).json(error);
    }
})


// Mob Create Route
app.post('/mobs', async (req, res) => {
    try{
        res.json(await Mobs.create(req.body));
    } catch (error) {

        res.status(400).json(error);
    }
})

// Mob Delete Route
// app.delete('/mobs/:id', async (req, res) => {
//     try{ 
//         res.json(await Mobs.findByIdAndDelete(req.params.id));
//     } catch (error) {

//         res.status(400).json(error);
//     }
// })

// Mob Update Route
app.put('/mobs/:id', async (req, res) => {
    try {
        res.json(
            await Mobs.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {

        res.status(400).json(error);
    }
})

///////////////////////////////
// LISTENER
///////////////////////////////


app.listen(PORT, () => console.log(`Port ${PORT} is up and running...`))