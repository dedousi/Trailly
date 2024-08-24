import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import xml2js from 'react-native-xml2js';

async function fetchAllPublicTrails(){             
    try{
        const response = await fetch(`-address-/trail/get_all_public_trails`);
        if (response.ok) {
            const trails = await response.json();
            return trails;
        } else {
            Alert.alert('Error', 'There was a problem with fetching the trails.');
            console.log('There was a problem with fetching the trails.');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem with fetching the trails.');
        console.log('There was a problem with fetching the trails: ', error);
    }
    return [];
};

async function fetchUserTrails(user_id) {             
    try{
        const response = await fetch(`-address-/trail/get_user_trails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id})
        });
        if (response.ok) {
            const trails = await response.json();
            return trails;
        } else {
            Alert.alert('Error', 'There was a problem with fetching the trails.');
            console.log('There was a problem with fetching the trails .');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem with fetching the trails.');
        console.log('There was a problem with fetching the trails: ', error);
    }
    return [];
};

async function fetchTrail(trail_id) {
    try{
        const response = await fetch(`-address-/trail/get_trail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({trail_id})
        });
        if (response.ok) {
            const trail = await response.json();
            return trail;
        } else {
            Alert.alert('Error', 'There was a problem with fetching the trail.');
            console.log('There was a problem with fetching the trail .');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem with fetching the trail.');
        console.log('There was a problem with fetching the trail: ', error);
    }
    return null;
}

async function removeTrail(trail_id, user_id) {
    try {
        const response = await fetch(`-address-/trail/remove_trails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trail_id, user_id })
        });
        if (response.ok) {
            Alert.alert('Success', 'You have successfully removed the unwanted trails!');
            console.log('Selected trails were removed.');
            return true;
        } else {
            Alert.alert('Error', 'There was a problem removing the selected trails.')
            console.log('There was a problem removing the selected trails.');
        }
    } catch (error) {
        Alert.alert('Error', 'The selected trails could not be removed.');
        console.log('The selected trails could not be removed: ', error);
    }  
    return false;      
};

async function uploadTrailFile() {
    try {
        const result = await DocumentPicker.getDocumentAsync({ type: 'application/octet-stream' });
        if (result.assets[0].uri.includes('.gpx') || result.assets[0].uri.includes('.tcx')) 
        {   
            console.log(result);
            return result;
        } else {
            Alert.alert('Error','File type not supported.');
            console.log('File type not supported.');
        }
    } catch (error) {
        Alert.alert('Error', 'Document picking error.');
        console.log('Document picking error:', error);
    }
    return null;
}

async function addTrail(filename, file, use, user_id, details, coords) {
    try {
        let type = null;
        let fileToJSON = null;
        let fileContent = null;
        if (file === 'recorded') {
            type = 'NONE';
            fileToJSON = coords;
        } else if (file.assets[0].uri.includes('.gpx')) {
            type = 'GPX';
            fileContent = await FileSystem.readAsStringAsync(file.assets[0].uri);
            fileToJSON = await fromGPXtoJSON(fileContent);
        } else if (file.assets[0].uri.includes('.tcx')) {
            type = 'TCX';
            fileContent = await FileSystem.readAsStringAsync(file.assets[0].uri);
            fileToJSON = await fromTCXtoJSON(fileContent);
        } else {
            Alert.alert('Error', 'Wrong file type. Expected (.gpx or .tcx).');
            console.log('Wrong file type. Expected (.gpx or .tcx).');
            return false;
        }
        const formData = new FormData();
        formData.append('filename', filename);
        formData.append('id', uuid.v4());
        formData.append('use', use);
        formData.append('user_id', user_id);
        formData.append('type', type);
        formData.append('details', details);
        formData.append('contents',JSON.stringify(fileToJSON, null));
        const response = await fetch(`-address-/trail/add_trail`, {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        });
        if (response.ok) {
            Alert.alert('File uploaded successfully','Your recorded trail file was successfully uploaded!');
            console.log('File uploaded successfully.');
            return true;
        } else {
            Alert.alert('File upload failed');
            console.log('File upload failed');
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong while picking the file.');
        console.log('Document picking error:', error);
    }
    return false; 
};

async function fromGPXtoJSON(file) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(file, (error, result) => {
            if (error) {
                Alert.alert('Error', 'Error reading the file.');
                console.error('Error parsing GPX:', error);
                reject(error);
            }
            const gpx = { tracks: [] };
            if (result.gpx.trk) {
                result.gpx.trk.forEach((track) => {
                    if (track.trkseg) {
                        track.trkseg.forEach((segment) => {
                            if (segment.trkpt) {
                                segment.trkpt.forEach((point) => {
                                    const pointData = {
                                        latitude: point['$'].lat,
                                        longitude: point['$'].lon
                                    };
                                    gpx.tracks.push(pointData);
                                });
                            }
                        });
                    }
                });
            }
            resolve(gpx);
        });
    });
};

async function fromTCXtoJSON(file) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(file, (error, result) => {
            if (error) {
                Alert.alert('Error', 'Error reading the file.');
                console.error('Error parsing TCX:', error);
                reject(error);
            }
            const tcx = { tracks: [] };
            const trackpoints = result.TrainingCenterDatabase.Courses[0].Course[0].Track[0].Trackpoint;;
            tcx.tracks = trackpoints.map((point) => ({
                latitude: point.Position[0].LatitudeDegrees[0],
                longitude: point.Position[0].LongitudeDegrees[0]
            }))
            resolve(tcx);
        });
    });
}

async function searchTrails(user_id, searchQuery) {
    try {
        const words = searchQuery.split(' ').filter(word => word !== '');
        const response = await fetch(`-address-/trail/get_searched_trails`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id, words})
        });
        if (response.ok) {
            const trails = await response.json();
            return trails;
        } else {
            Alert.alert('Error', 'Something went bad while fetching the trails.');
            console.log('Something went bad while fetching the trails.');
        }
    } catch (error) {
        Alert.alert('Error fetching the trails');
        console.log('Error fetching the trails: ', error);
    }
    return [];
}

async function addAdditionalUsers(user_id, trail_id) {
    try {
        const response = await fetch(`-address-/trail/add_additional_user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id, trail_id})
        });
        if (response.ok) {
            Alert.alert('Success','The trail was added to your list!');
        } else {
            Alert.alert('Error', 'Could not add trail to the trails list');
            console.log('Could not add trail to the trails list.');
        }
    } catch (error) {
        Alert.alert('Error adding trail to the trails list');
        console.log('Error adding trail to the trails list: ', error);
    }
}

const TrailService = { 
    fetchAllPublicTrails, 
    fetchUserTrails, 
    fetchTrail,
    removeTrail, 
    uploadTrailFile, 
    addTrail, 
    searchTrails, 
    addAdditionalUsers
};
export default TrailService;
