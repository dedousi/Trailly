import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

import TrailService from './TrailService';
import MapService from './MapService';
import AppService from './AppService';
import ReportService from './ReportService';
import NotificationService from './NotificationService';

async function addWarningToTrailQuery(trail_id, warning) {
    try {
        const response = await fetch(`-address-/rescue/add_warning_to_trail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({trail_id, warning})
        });
        if (response.ok) {
            console.log('Warnings have been added.');
            return true;
        } else {
            console.log('There was a problem with adding warnings.');
        }
    } catch (error) {
        Alert.alert('Error', 'Warning was not updated.');
        console.log('Warning failed to be added in trail descriptions: ', error);   
    }
    return false;
}

async function addWarningToAllTrailsQuery(loc, warning) {
    try {
        loc = JSON.parse(loc);
        console.log(loc)
        const latitude = loc.latitude;
        const longitude = loc.longitude;
        const locationJSON = { latitude, longitude };
        const location = JSON.stringify(locationJSON);
        const response = await fetch(`-address-/rescue/add_warning_to_location`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({location, warning})
        });
        if (response.ok) {
            return true;
        } else {
            console.log('There was a problem with adding warnings.');
        }
    } catch (error) {
        Alert.alert('Error', 'Warning was not updated.');
        console.log('Warning failed to be added in trail descriptions: ', error);   
    }
    return false;
}

async function addWarning(trail_issue, trail_id, location) {
    let warning = "";
    if(trail_issue == 'landslide') {
        warning = "There have been reports of landslides!";
    } else if (trail_issue == 'broken bridge') {
        warning = "There have been reports that a brigde on this trail is broken!";
    } else if (trail_issue == 'flood') {
        warning = "There have been reports of flooding";
    } else if (trail_issue == 'wrong signage') {
        warning = "There have been reports of wrong signage!";
    }
    if(trail_id == null) {
        if(await addWarningToAllTrailsQuery(location, warning)) return true;
    } else {
        if(await addWarningToTrailQuery(trail_id, warning)) return true;
    }
    return false;
}

async function getTrailsWithLocation(loc,user_id) {
    try {
        let location = {};
        for (const key in loc) {
            if (Object.hasOwnProperty.call(loc, key)) {
                location[key] = loc[key].toString();
            }
        }
        location = JSON.stringify(location);
        const response = await fetch(`-address-/rescue/get_all_trails_with_location_for_user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({location, user_id})
        });
        if (response.ok) {
            const trails = await response.json();
            return trails;
        }
    } catch (error) {
        Alert.alert('Error', 'Fetching trails with location was not possible.');
        console.log('Fetching trails with location failed: ', error);   
    }
    return [];
}

async function decideIfTrailIsClose(item, location) {
    const trail = await MapService.getTrail(item);
    const trailStart = trail[2];
    const trailEnd = trail[3];
    const distanceFromStart = MapService.getDistanceFromLatLonInKm(location.latitude, location.longitude, trailStart.latitude, trailStart.longitude);
    const distanceFromEnd = MapService.getDistanceFromLatLonInKm(location.latitude, location.longitude, trailEnd.latitude, trailEnd.longitude);
    if(distanceFromStart <= 10) { // 10km distance
        return {id: item.id, name: item.filename, point: trailStart, flag: 'start'};
    } else if(distanceFromEnd <= 10) { // 10km distance
        return {id: item.id, name: item.filename, point: trailEnd, flag: 'end'};
    }
    return null;
}

async function getTrailsNearLocation(user_id) {
    let location = await AppService.getLocation();
    const latitude = location.latitude;
    const longitude = location.longitude;
    location = { latitude, longitude };
    let resultingTrails = [];
    try {
        const publicTrails = await TrailService.fetchAllPublicTrails();
        const userTrails = await TrailService.fetchUserTrails();
        const trailsWithLocation = await getTrailsWithLocation(location,user_id);

        if(publicTrails.length > 0) {
            for (const item of publicTrails) {
                let result = await decideIfTrailIsClose(item,location);
                if(result != null) {
                    resultingTrails.push(result);
                }
            }
        }
        if(userTrails.length > 0) {
            for (const item of userTrails) {
                let result = await decideIfTrailIsClose(item,location);
                if(result != null) {
                    resultingTrails.push(result);
                }
            };
        }
        if(trailsWithLocation.length > 0) {
            for (const item of trailsWithLocation) {
                console.log(item)
                resultingTrails.push({id: item.id, name: item.filename, point: location, flag: 'location'});
            };
        }
        if(resultingTrails.length > 0) {
            let uniqueIds = {};
            resultingTrails = resultingTrails.filter(item => {
                if (!uniqueIds[item.id]) {
                    uniqueIds[item.id] = true;
                    return true;
                }
                return false;
            });
        }
        return resultingTrails;  
    } catch (error) {
        Alert.alert('Error', 'No trails were retrieved near the location.');
        console.log('Warning failed: ', error);   
    }
    return resultingTrails;
}

async function makeVolunteerTeam(category, location, report_id) {
    try {
        const teamID = uuid.v4();
        const response = await fetch(`-address-/rescue/make_volunteer_team`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({team_id: teamID, location, category, report_id})
        });
        if (response.ok) { 
            return true;
        } else {
            Alert.alert('Error', 'Could not make a volunteer team.');
            console.log('Could not make a volunteer team.');
        }
    } catch (error) {
        Alert.alert('Error', 'Could not make a volunteer team.');
        console.log('Could not make a volunteer team: ', error);   
    }
    return false;
}

async function fetchVolunteerTeam(report_id) {
    try {
        const response = await fetch(`-address-/rescue/get_volunteer_team`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({report_id})
        });
        if (response.ok) {
            const team = await response.json();
            return team;
        } else {
            console.log('Could not find volunteer team.');
        }
    } catch (error) {
        console.log('Could not find volunteer team: ', error);   
    }
    return null;
}

async function addVolunteer(report_id, user_id) {
    const team = await fetchVolunteerTeam(report_id);
    if(team[0] == null) return false;
    const team_id = team[0].id;
    try {
        const response = await fetch(`-address-/rescue/add_volunteer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({team_id, user_id})
        });
        if (response.ok) {
            return true;
        } else {
            Alert.alert('Error', 'Could not add to volunteer team.');
            console.log('Could add to volunteer team.');
        }
    } catch (error) {
        Alert.alert('Error', 'Could not add to volunteer team.');
        console.log('Could not add to volunteer team: ', error);   
    }
    return false;
}

async function getTeamSize(team_id) {
    try {
        const response = await fetch(`-address-/rescue/get_number_of_team_members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({team_id})
        });
        if (response.ok) {
            const number = await response.json();
            return number;
        } else {
            Alert.alert('Error', 'Could not count members of the volunteer team.');
            console.log('Could not count members of the volunteer team.');
        }
    } catch (error) {
        Alert.alert('Error', 'Could not count members of the volunteer team.');
        console.log('Could not count members of the volunteer team: ', error);   
    }
    return -1;
}

// minimum VALID team size will be 5 people.
async function isValid(report_id) {
    const team = await fetchVolunteerTeam(report_id);
    console.log(team)
    if(team[0] != null) {
        const teamSize = await getTeamSize(team[0].id);
        const minValidTeamSize = 5;
        if(teamSize >= minValidTeamSize) {
            await informVolunteers(report_id);
            await informUserInTrouble(report_id);
            return true;
        }
    }
    return false;
}

async function informUserInTrouble(report_id) {
    const report = await ReportService.fetchReport(report_id);
    if(report != null)
        await NotificationService.sendNotificationToUser(report.user_id);
}

async function informVolunteers(report_id) {
    const team = await fetchVolunteerTeam(report_id);
    const members = await fetchTeamMembers(team[0].id);
    for (const obj of members) {
        await NotificationService.sendNotificationToVolunteer(obj.members);
    }
}

async function fetchTeamMembers(team_id) {
    try {
        const response = await fetch(`-address-/rescue/get_volunteers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({team_id})
        });
        if (response.ok) {
            const members = await response.json();
            return members;
        } else {
            Alert.alert('Error', 'Could not get members of the volunteer team.');
            console.log('Could not get members of the volunteer team.');
        }
    } catch (error) {
        Alert.alert('Error', 'Could not get members of the volunteer team.');
        console.log('Could not get members of the volunteer team: ', error);   
    }
    return [];
}

async function hasJoined(user_id, report_id) {
    const team = await fetchVolunteerTeam(report_id);
    const members = await fetchTeamMembers(team[0].id);
    let flag = false;
    for (const obj of members) {
        if(obj.members.includes(user_id.toString())) {
            flag = true;
            break;
        }
    }
    return flag;
}

const RescueService = { 
    addWarning,
    getTrailsNearLocation,
    getTrailsWithLocation,
    makeVolunteerTeam,
    addVolunteer,
    fetchVolunteerTeam,
    isValid,
    informUserInTrouble,
    hasJoined,
    fetchTeamMembers
};
export default RescueService;
