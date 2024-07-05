const express = require('express');
const multer = require('multer');
const pool = require('../config/DB.js');
require('dotenv/config');

const router = express.Router();

router.post('/add_warning_to_trail', async (request, response) => {
    try {
        const trail_id = request.body.trail_id;
        const warning = request.body.warning;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `UPDATE trails SET text=CONCAT(text, '\n', ?) WHERE trail_id=?`;
            connection.query(query, [warning,trail_id], (err, res) => {
                connection.release();
                if (err) throw err;
                response.status(200).send('Warning added successfully.');
            });
        });
    } catch (error) {
        console.error('Error adding warnings:', error);
        response.status(500).send('Error adding warnings to trails.');
    }
});

router.post('/add_warning_to_location', async (request, response) => {
    try {
        const location = request.body.location;
        const warning = request.body.warning;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `UPDATE trails SET text=CONCAT(text, '\n', ?) WHERE contents LIKE CONCAT('%', ?, '%')`;
            connection.query(query, [warning,location], (err, res) => {
                connection.release();
                if (err) throw err;
                response.status(200).send('Warning added successfully.');
            });
        });
    } catch (error) {
        console.error('Error adding warnings:', error);
        response.status(500).send('Error adding warnings to trails.');
    }
});

router.post('/get_all_trails_with_location_for_user', async (request, response) => {
    try {
        const location = request.body.location;
        const user_id = request.body.user_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT * FROM trails WHERE (contents LIKE CONCAT('%', ?, '%')) AND (user_id = ? OR for_use = 'public');`;
            connection.query(query, [location, user_id], (err, res) => {
                connection.release();
                if (err) throw err; 
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error fetching trails:', error);
        response.status(500).send('Error fetching trails.');
    }
});

router.post('/make_volunteer_team', async (request, response) => {
    try {
        const location = JSON.stringify(request.body.location);
        const team_id = request.body.team_id;
        const report_id = request.body.report_id;
        const category = request.body.category;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `INSERT INTO teams(id, location, category, report_id) VALUES (?,?,?,?);`;
            connection.query(query, [team_id,location,category,report_id], (err, res) => {
                connection.release();
                if (err) throw err; 
                response.status(200).send('Volunteer team was successfully created.');
            });
        });
    } catch (error) {
        console.error('Error creating volunteer team for report:', error);
        response.status(500).send('Error creating volunteer team for report.');
    }
});

router.post('/get_volunteer_team', async (request, response) => {
    try {
        const report_id = request.body.report_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT * FROM teams WHERE (report_id = ?);`;
            connection.query(query, [report_id], (err, res) => {
                connection.release();
                if (err) throw err; 
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error finding volunteer team for report:', error);
        response.status(500).send('Error finding volunteer team for report.');
    }
});

router.post('/add_volunteer', async (request, response) => {
    try {
        const volunteer = request.body;
        console.log("here",volunteer.user_id);
        if (!volunteer.user_id) {
            response.status(400).send('User ID is missing.');
            return;
        }
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `INSERT INTO volunteers(team_id,members) VALUES (?,?);`;
            connection.query(query, [volunteer.team_id,volunteer.user_id], (err, res) => {
                connection.release();
                if (err) {
                    console.log(err);
                    response.status(500).send('Duplicate entry - username already taken.');
                } else {
                    response.status(200).send('Volunteer added.');
                }
            });
        });
    } catch (error) {
        console.error('Error adding volunteer:', error);
        response.status(500).send('Error adding volunteer.');
    }
});

router.post('/get_number_of_team_members', async (request, response) => {
    try {
        const team_id = request.body.team_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT COUNT(*) AS count FROM volunteers WHERE team_id = ?`;
            connection.query(query, [team_id], (err, res) => {
                connection.release();
                if (err) throw err; 
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error counting volunteers:', error);
        response.status(500).send('Error counting volunteers.');
    }
});

router.post('/get_volunteers', async (request, response) => {
    try {
        const team_id = request.body.team_id;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = `SELECT members FROM volunteers WHERE team_id = ?`;
            connection.query(query, [team_id], (err, res) => {
                connection.release();
                if (err) throw err; 
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        response.status(500).send('Error fetching volunteers.');
    }
});

module.exports = router;