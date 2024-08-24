import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

import AppService from './AppService';
import RescueService from './RescueService';

async function fetchReport(report_id) {
    try{
        const response = await fetch(`-address-/report/get_report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ report_id })
        });
        if(response.ok) {
            const report = await response.json();
            return report;
        } else {
            Alert.alert('Error', 'There was a problem with fetching the report.');
            console.log('There was a problem with fetching the report.');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem with fetching the report.');
        console.log('There was a problem with fetching the report: ', error);
    }
    return null;
};

async function fetchActiveReports() {
    try{
        const response = await fetch(`-address-/report/get_active_reports`);
        if(response.ok){
            const activeReports = await response.json();
            return activeReports;
        } else {
            Alert.alert('Error', 'There was a problem with fetching the active reports.');
            console.log('There was a problem with fetching the active reports.');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem with fetching the active reports.');
        console.log('There was a problem with fetching the active reports: ', error);
    }
    return [];
};

async function updateActiveReportToNonActive(report) {
    try {
        const response = await fetch(`-address-/report/update_active_reports_to_non_active`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportID: report })
        });

        if(response.ok) {
            console.log('Sending notifications...');
            return true;
        } else {
            Alert.alert('Error', 'There was a problem sending notifications for the selected report.');
            console.log('There was a problem sending notifications for the selected report.');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem sending notifications for the selected report.');
        console.log('There was a problem sending notifications for the selected report: ', error);
    }
    return false;
};

async function addReport(category, inputText, trailID, userID) {
    let report = {};
    if(trailID == null) {
        report = {
            id: uuid.v4(),
            location : await AppService.getLocation(),
            category : category,
            text : inputText,
            alerted : 0,
            trail_id: '0',
            user_id: userID
        };
    } else {
        report = {
            id: uuid.v4(),
            location : await AppService.getLocation(),
            category : category,
            text : inputText,
            alerted : 0,
            trail_id: trailID,
            user_id: userID
        };
    }
    console.log(report)
    try{  
        const response = await fetch(`-address-/report/add_report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(report)
        });
        
        if (response.ok) {
            Alert.alert('Report was successfully made!', 'Closeby users and services will be alerted.');
            console.log('Report was registered.');
            if(report.category == 'fire' || report.category == 'sos') {
                if(await RescueService.makeVolunteerTeam(report.category,report.location,report.id))
                    console.log('Volunteer team was created as an option;');
            }
            if (report.category == 'landslide' || report.category == 'broken bridge' ||
                report.category == 'flood' || report.category == 'wrong signage') {
                if(report.trail_id != '0') {
                    if(await RescueService.addWarning(report.category, report.trail_id, report.location))
                        console.log('Warnings were added accordingly.');
                }
            }
            return true;
        } else {            
            Alert.alert('Report was not registered. Try again.');
            console.log('Report failed to register.');
        }
    } catch (error) {
        Alert.alert('Error', 'Report was not made. Try again.');
        console.log('Report failed to register: ', error);   
    } 
    return false;
};

const ReportService = { 
    fetchActiveReports,
    fetchReport, 
    updateActiveReportToNonActive, 
    addReport
};
export default ReportService;
