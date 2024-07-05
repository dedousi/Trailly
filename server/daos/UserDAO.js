const express = require('express');
const multer = require('multer');
const pool = require('../config/DB.js');
require('dotenv/config');

const router = express.Router();

router.post('/register', async (request, response) => {
    try{
        const user = request.body;
        pool.getConnection((error, connection) => {
            if(error) throw error;
            const query = `INSERT INTO users(id, username, password, role, active) VALUES (?,?,?,?,?);`;
            connection.query(query, [user.id, user.username, user.password, user.role, user.active], (err, res) => {
                connection.release();
                if (err) {
                    console.log(err);
                    response.status(500).send('Duplicate entry - username already taken.');
                } else {
                    console.log(res);  
                    response.status(200).send('User registered sucessfully (role == user).');
                }
            });
        });
    } catch (error) {
        console.error('Error handling registration:', error);
        response.status(500).send('Error handling registration.');
    }
});

router.post('/login', async (request, response) => {
    try {
        const credentials = request.body;
        const username = credentials.username;
        const password = credentials.password;
        pool.getConnection( (error, connection) => {
            if(error) throw error;
            const query = 'SELECT * FROM users WHERE (USERNAME = ?) AND (PASSWORD = ?)';
            connection.query(query, [username, password], (err, res) => {
                if (err) { 
                    throw err;
                } else if(res.length === 0) {
                    console.log('Invalid credentials - user/admin not found.');
                    response.status(500).send('Invalid credentials - user/admin not found.');
                } else {
                    const query2 = 'UPDATE users SET active=1 WHERE (USERNAME = ?) AND (PASSWORD = ?);';
                    connection.query(query2, [username, password], (updateErr, updateRes) => {
                        connection.release();
                        if (updateErr) throw updateErr;
                        console.log('User is now active.');
                        response.status(200).send(res[0]);
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error handling login:', error);
        response.status(500).send('Error handling login.');
    }
});

router.post('/logout', async (request, response) => {
    try{
        const user = request.body;
        pool.getConnection((error, connection) => {
            if(error) throw error;
            const query = `UPDATE users SET active=0 WHERE (USERNAME = ?) AND (PASSWORD = ?);`;
            connection.query(query, [user.username, user.password], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log('User is now inactive.');
            });
        });
        response.status(200).send('User is now inactive.');
    } catch (error) {
        console.error('Error handling registration:', error);
        response.status(500).send('Error handling registration.');
    }
});

router.post('/set_notification_token', async (request, response) => {
    try{
        const user_id = request.body.user_id;
        const token = request.body.notification_token;
        pool.getConnection((error, connection) => {
            if(error) throw error;
            const query = `UPDATE users SET token=? WHERE id=?;`;
            connection.query(query, [user_id, token], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log('User has his notification token now.');
            });
        });
        response.status(200).send('User has his notification token now.');
    } catch (error) {
        console.log('Error updating user with notification token:', error);
        response.status(500).send('Error updating user with notification token.');
    }
});

router.post('/get_user', async (request, response) => {
    try{
        const user_id = request.body.user_id;
        pool.getConnection((error, connection) => {
            if(error) throw error;
            const query = `SELECT * FROM users WHERE id=?;`; 
            connection.query(query, [user_id], (err, res) => {
                connection.release();
                if (err) throw err;
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.log('Error fetching user: ', error);
        response.status(500).send('Error fetching user.');
    }
});

module.exports = router;