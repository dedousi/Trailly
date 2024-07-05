import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import styles from '../../../assets/StylesSheet';
import MapService from '../../../services/MapService';
import TrailService from '../../../services/TrailService';

export default function RescueMap({route, navigation}) {    
    
    const trailID = route.params.trailID;
    const point = route.params.point;
    const flag = route.params.flag;
    const [trailCoordinates, setTrailCoordinates] = useState([]);
    const [location, setLocation] = useState(null);
    const [trailEnd, setTrailEnd] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [displayPoint, setDisplayPoint] = useState(true)
    
    useEffect(() => { 
        async function initialise() {
            const location = {"latitude":40.027602,"longitude":20.762373}
            if(point.latitude == location.latitude && point.longitude == location.longitude) setDisplayPoint(false);
            setLocation(location);
            const initialRegion = {latitude: location.latitude, longitude: location.longitude, latitudeDelta: 1, longitudeDelta: 1};
            setInitialRegion(initialRegion)
            const trail = await TrailService.fetchTrail(trailID);
            const trailDetails = await MapService.getTrail(trail[0]);
            setTrailCoordinates(trailDetails[0]);
            setTrailEnd(trailDetails[3]);
            if(flag == 'start' || flag == 'end') {
                const newTrailCoordinates = [...trailDetails[0], location];
                setTrailCoordinates(newTrailCoordinates);
            } else if (flag == 'location') {
                loc = {latitude: location.latitude, longitude: location.longitude};
                let indexOfLocation = -1;
                for (let i = 0; i < trailDetails[0].length; i++) {
                    const coord = trailDetails[0][i];
                    if (coord.latitude == loc.latitude && coord.longitude == loc.longitude) {
                        indexOfLocation = i;
                        break;
                    }
                }
                if (indexOfLocation != -1) {
                    const portionFromPoint = trailDetails[0].slice(indexOfLocation);
                    setTrailCoordinates(portionFromPoint);
                }
            }
        }
        initialise();
    },[]);

    return (
        
        <SafeAreaView style={styles.default_page}>
        {initialRegion &&
            <View>
            {(initialRegion.latitude != NaN) && (initialRegion.longitude != NaN) && (initialRegion.latitudeDelta != -Infinity) && (initialRegion.longitudeDelta != -Infinity) &&
                <View style={styles.explore_map_container}>
                    <MapView
                        style={styles.explore_map}
                        initialRegion={initialRegion}
                    >
                    {location &&
                        <Marker
                            coordinate={{latitude: location.latitude, longitude: location.longitude}}
                            title="You are HERE."
                            pinColor="red"
                        />
                    }
                    {point && displayPoint &&
                        <Marker
                            coordinate={{latitude: point.latitude, longitude: point.longitude}}
                            title="Your Destination."
                            pinColor="yellow"
                        />
                    }
                    {trailEnd && 
                        <Marker 
                        coordinate={{latitude: trailEnd.latitude, longitude: trailEnd.longitude}}
                        title="Your Destination."
                        pinColor="blue"
                        />
                    }
                    {trailCoordinates && 
                        <Polyline
                            coordinates={trailCoordinates}
                            strokeColor="green"
                            strokeWidth={3}
                        />
                    }
                    </MapView>
                </View>
            }
            </View>
        }
        </SafeAreaView>       
    );
}