import * as Location from 'expo-location';

async function getLocation() {
    let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    return currentLocation.coords;
};

const AppService = { 
    getLocation 
};
export default AppService;   