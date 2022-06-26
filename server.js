// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));


// function to complete GET '/all'
const sendData = (req, res) => {
    res.send(projectData)
}
app.get('/all', sendData)


// Post Route
const addTempData = (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        user_feelings: req.body.user_feelings
    }
    res.send(projectData);
}
app.post('/addWeatherInfo', addTempData)


