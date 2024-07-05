const mysql = require('mysql');
require('dotenv/config');

// instead of instant connection - we create a pool 
// this has to do with error handling later on
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = pool;