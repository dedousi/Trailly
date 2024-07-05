const express = require('express');
const multer = require('multer');
const pool = require('../config/DB.js');
require('dotenv/config');

const router = express.Router();

router.post('/add_trail', multer().single('file'), async (request, response) => {
    try {
        const filename = request.body.filename;
        const id = request.body.id;
        const use = request.body.use;
        const user_id = request.body.user_id;
        const type = request.body.type;
        const details = request.body.details;
        const contents = request.body.contents;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = 'INSERT INTO trails(id, filename, for_use, user_id, file_type, details, contents) VALUES (?,?,?,?,?,?,?);';
            connection.query(query, [id, filename, use, user_id, type, details,contents], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
            });
        });
        response.status(200).send('File uploaded successfully.');
    } catch (error) {
        console.error('Error handling file upload:', error);
        response.status(500).send('Error handling file upload.');
    }   
});

router.post('/add_additional_user', async (request, response) => {
    try {
        const trail_id = request.body.trail_id;
        const user_id = request.body.user_id;
        const text = " "+user_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `UPDATE trails SET additional_users = CONCAT(additional_users, ?) WHERE (id = ?);`;
            connection.query(query, [text, trail_id], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
            });
        });
        response.status(200).send('Additional user was added.');
    } catch (error) {
        console.error('Error adding the user:', error);
        response.status(500).send('Error adding the user.');
    }   
});

router.post('/get_trail', async (request, response) => {
    try {
        const trail_id = request.body.trail_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT * FROM trails WHERE id=?;`;
            connection.query(query, [trail_id], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error handling get request for trail:', error);
        response.status(500).send('Error handling get request for trail.');
    }
});

router.get('/get_all_public_trails', async (request, response) => {
    try {
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT * FROM trails WHERE for_use='public';`;
            connection.query(query, (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error handling get request for custom trails:', error);
        response.status(500).send('Error handling get request for custom trails.');
    }
});

router.post('/get_user_trails', async (request, response) => {
    try {
        const user_id = request.body.user_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT * FROM trails WHERE user_id=? OR additional_users LIKE CONCAT('%', ?, '%');`;
            connection.query(query, [user_id, user_id], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error handling get request for custom trails:', error);
        response.status(500).send('Error handling get request for custom trails.');
    }
});

router.post('/get_searched_trails', async (request, response) => {
    try {
        const user_id = request.body.user_id;
        const words = request.body.words;
        const trails = [];
        let finishedQueries = 0;

        pool.getConnection((error, connection) => {
            if (error) throw error;
            words.forEach(word => {
                const query = `SELECT * FROM trails WHERE filename LIKE CONCAT('%', ?, '%') AND (user_id=? OR for_use='public' OR additional_users LIKE CONCAT('%', ?, '%'));`;
                connection.query(query, [word, user_id, user_id], (err, res) => {
                    if (err) throw err;
                    trails.push(res);
                    finishedQueries++;
                    if (finishedQueries === words.length) {
                        connection.release();
                        console.log(trails)
                        response.status(200).send(trails);
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error handling deleting trails:', error);
        response.status(500).send('Error handling deleting trails.');
    }
});

router.post('/remove_trails', async (request, response) => {
    try {
        const trail_id = request.body.trail_id;
        const user_id = request.body.user_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = 'DELETE FROM trails WHERE id=? AND user_id=?;';
            connection.query(query, [trail_id,user_id], (err, res) => {
                if (err) throw err;                    
            });
            const query2 = `UPDATE trails SET additional_users=REPLACE(additional_users,?, '') WHERE id=? AND NOT (user_id=?);`;
            connection.query(query2, [user_id,trail_id,user_id], (err, res) => {
                if (err) throw err;
            });
            console.log(`Trail with id ${trail_id} has been removed.`)
            connection.release();
        });
        response.status(200).send('Trail was deleted with success.');
    } catch (error) {
        console.error('Error deleting trail:', error);
        response.status(500).send('Error deleting trail.');
    }
});

module.exports = router;