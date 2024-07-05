// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const pool = require('./config/DB.js');
require('dotenv/config');

const user = require('./daos/UserDAO');
const report = require('./daos/ReportDAO');
const trail = require('./daos/TrailDAO');
const rescue = require('./daos/RescueDAO');

// For Server Setup
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credetials: true,
    optionSuccessStatus: 200
}));

// Server Home
app.get('/', (request, response) => {
    response.send('This is the server home for the Trailly application.');
});

// DAOs
app.use('/user', user);
app.use('/report', report);
app.use('/trail', trail);
app.use('/rescue', rescue);

// Database Connection
pool.getConnection( (error, connection) => {
    if(error) {
        throw error;
    } else {
        console.log('Connected to MySQL database on port 5000.');
    }
});

// Server Port Configuration
const port = 4000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});