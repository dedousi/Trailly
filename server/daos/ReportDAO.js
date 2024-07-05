const express = require('express');
const multer = require('multer');
const pool = require('../config/DB.js');
require('dotenv/config');

const router = express.Router();

router.post('/add_report', async (request, response) => {
    try {
        const report = request.body;
        pool.getConnection((error, connection) => {
            if(error) throw error;
            const query = 'INSERT INTO reports(id, location, category, text, alerted, trail_id, user_id) VALUES (?,?,?,?,?,?,?);';
            connection.query(query, [report.id, JSON.stringify(report.location), report.category, report.text, report.alerted, report.trail_id, report.user_id], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
            });
        });
        response.status(200).send('Report registered sucessfully.');
    } catch (error) {
        console.error('Error handling report:', error);
        response.status(500).send('Error handling report.');
    }
});

router.post('/get_report', async (request, response) => {
    try {
        const report_id = request.body.reportID;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = 'SELECT * FROM reports WHERE id = ?;';
            connection.query(query, [report_id], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error handling get request for report:', error);
        response.status(500).send('Error handling get request for report.');
    }
});

router.get('/get_active_reports', async (request, response) => {
    try {
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = 'SELECT * FROM reports WHERE alerted=0;';
            connection.query(query, (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(res);  
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error handling get request for reports:', error);
        response.status(500).send('Error handling get request for reports.');
    }
});

router.get('/get_non_active_reports', async (request, response) => {
    try {
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = 'SELECT * FROM reports WHERE alerted=1;';
            connection.query(query, (err, res) => {
                connection.release();
                if (err) throw err; 
                response.status(200).send(res);
            });
        });
    } catch (error) {
        console.error('Error handling get request for reports:', error);
        response.status(500).send('Error handling get request for reports.');
    }
});

router.post('/update_active_reports_to_non_active', async (request, response) => {
    try {
        const report = request.body.reportID;
        pool.getConnection((error, connection) => {
            if (error) throw error;
            const query = 'UPDATE reports SET alerted=1 WHERE id=? AND alerted=0;';
            connection.query(query, [report], (err, res) => {
                connection.release();
                if (err) throw err;
                console.log(`Report with ID ${report} has been updated.`)
            });
        });  
        response.status(200).send('Report was updated.');
    } catch (error) {
        console.error('Error while updating report:', error);
        response.status(500).send('Error while updating report.');
    }
});

router.post('/remove_reports', async (request, response) => {
    try {
        const reports = request.body.reportIDs;
        console.log(reports);
        pool.getConnection((error, connection) => {
            if (error) throw error;
            
            reports.forEach(report => {    
                const query = 'DELETE FROM reports WHERE id=?;';
                connection.query(query, [report], (err, res) => {
                    if (err) throw err;
                    console.log(`Report with ID ${report} has been removed.`)
                });
            });
            connection.release();
        });
        response.status(200).send('Reports were removed with success.');
    } catch (error) {
        console.error('Error removing reports:', error);
        response.status(500).send('Error removing reports.');
    }
});

module.exports = router;