///////////////////////////////
// DEPENDENCIES
///////////////////////////////



// get .env variables
require('dotenv').config();

// pull PORT from .env, give default value of 3001
const { PORT = 3001 } = process.env;

// import
const express = require('express');

// create application object
const app = express();



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