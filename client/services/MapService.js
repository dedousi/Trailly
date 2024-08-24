import * as Location from 'expo-location';
import { Alert, Linking, BackHandler } from 'react-native';

import AppService from './AppService';

async function getCurrentLocation() {
    // Get permission to use location from user
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        let location = await Location.getLastKnownPositionAsync({ accuracy: Location.Accuracy.Highest });
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        return{ latitude, longitude, latitudeDelta: 0.1, longitudeDelta: 0.05 };
    } else {
        console.log('Permission to access location was denied.');
        Alert.alert(
            'Permission Required',
            'This app requires location access for full functionality. Please go to settings and enable location access.',
            [
                {
                    text: 'Go to Settings',
                    onPress: () => Linking.openSettings(),
                },
                {
                    text: 'Cancel',
                    onPress: () => {console.log('User canceled'); BackHandler.exitApp();},
                    style: 'cancel',
                },
            ],
        );
        return getCurrentLocation();
    }
};

async function getTrail(trail) {
    
    function convertToDoubles(arr) {
        return arr.map((item) => ({ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }));
    };

    try {
        let coords = JSON.parse(trail.contents).tracks;
        coords = convertToDoubles(coords);
        const trailStart = coords[0];
        const trailEnd = coords[coords.length - 1];
        const userLocation = await AppService.getLocation();
        const userDistanceFromTrail = getDistanceFromLatLonInKm(trailStart.latitude, trailStart.longitude, userLocation.latitude, userLocation.longitude);
        let drivingCoords = null;
        if (userDistanceFromTrail > 1) {
            drivingCoords = await getRoutes(userLocation,trailStart);
        }
        return [coords, drivingCoords, trailStart, trailEnd];
    } catch (error) {
        Alert.alert('Something went wrong.');
        console.log('Error: ', error);        
    }
}

/* Driving Route Coordinates from MapBox API 
 * MapBox API is used as a helping server for showing route to go to 
 * the trail starting point. */
async function getRoutes(origin, destination) {
    const apiKey = '';
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=${apiKey}&alternatives=true`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const routeCoordinates = route.geometry.coordinates.map(coord => ({ latitude: coord[1], longitude: coord[0] }));
            return routeCoordinates;
        } else {
            console.log('No route found.');
        }
    } catch (error) {
        console.error('Error fetching route:', error);
    }
    return [];
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const latitudeDifference = degToRadConverter(lat2 - lat1);
    const longitudeDifference = degToRadConverter(lon2 - lon1);

    function degToRadConverter(deg) {
        return deg * (Math.PI / 180);
    }

    const a = Math.pow(Math.sin(latitudeDifference/2), 2) +
              Math.pow(Math.sin(longitudeDifference/2), 2) *
              Math.cos(degToRadConverter(lat1)) *
              Math.cos(degToRadConverter(lat2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
}

function getInitialRegion(coords) {
    let minLatitude = Infinity;
    let minLongitude = Infinity;
    let maxLatitude = -Infinity;
    let maxLongitude = -Infinity;
    coords.forEach((point) => {
        minLatitude = Math.min(minLatitude, point.latitude);
        maxLatitude = Math.max(maxLatitude, point.latitude);
        minLongitude = Math.min(minLongitude, point.longitude);
        maxLongitude = Math.max(maxLongitude, point.longitude);
    });
    const latitude = (minLatitude + maxLatitude)/2;
    const longitude = (minLongitude + maxLongitude)/2;
    const latitudeDelta = maxLatitude - minLatitude + 0.01;
    const longitudeDelta = maxLongitude - minLongitude + 0.01;
    return { latitude, longitude, latitudeDelta, longitudeDelta };
}

function calculateMiddleCoordinates(coords) {
    let totalLatitude = 0;
    let totalLongitude = 0;
    coords.forEach((coord) => {
        totalLatitude += coord.latitude;
        totalLongitude += coord.longitude;
    });
    let middleLatitude = totalLatitude/coords.length;
    let middleLongitude = totalLongitude/coords.length;
    return {latitude: middleLatitude, longitude: middleLongitude};
};

const MapService = { 
    getCurrentLocation, 
    getDistanceFromLatLonInKm,
    getTrail,
    getInitialRegion,
    calculateMiddleCoordinates
};
export default MapService;
