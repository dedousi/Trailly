import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import styles from '../../../assets/StylesSheet';
import MapService from '../../../services/MapService';
import TrailService from '../../../services/TrailService';

export default function ExploreTrails({route, navigation}) {
    
    const userInfo = route.params.userInfo;
    const trailID = route.params.trailID;
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [trailStart, setTrailStart] = useState(null);
    const [trailEnd, setTrailEnd] = useState(null);
    const [trailCoordinates, setTrailCoordinates] = useState([]);
    const [initialRegion, setInitialRegion] = useState();
    const [display, setDisplay] = useState(false);

    useEffect(() => { 
        async function fetchTrail() {
            await MapService.getCurrentLocation();
            const trail = await TrailService.fetchTrail(trailID);
            const results = await MapService.getTrail(trail[0]);
            setSelectedTrail(trail[0]);
            setTrailCoordinates(results[0]);
            setTrailStart(results[2]);
            setTrailEnd(results[3]);
            setInitialRegion(MapService.getInitialRegion(results[0]));
            if(userInfo.id != '0') setDisplay(true);
        };
        fetchTrail();
    },[]);
    
    async function handleAdditionToTrailList() {
        await TrailService.addAdditionalUsers(userInfo.id, selectedTrail.id);
    }

    function handleDirections() {
        return navigation.navigate('Map',{userInfo: userInfo, trailID: trailID})
    }
    
    async function handleDelete() {
        if(await TrailService.removeTrail(selectedTrail.id, userInfo.id)) {
            return navigation.navigate('Home', {userInfo: userInfo});
        }
    }
    
    return (
        <SafeAreaView style={styles.default_page}>
            {(selectedTrail != null) && trailStart && trailEnd &&
                <View>
                    <Text style={{...styles.default_title_bold, fontSize: 30}}>{selectedTrail.filename}</Text>
                    <Text style={{...styles.default_title_bold, fontSize: 16}}>{selectedTrail.details}</Text>
                    <View style={styles.explore_map_container}>
                        <MapView
                            style={styles.explore_map}
                            initialRegion={initialRegion}
                        >
                        {trailStart &&
                            <Marker
                                coordinate={{latitude: trailStart.latitude, longitude: trailStart.longitude}}
                                title="Your Origin."
                                pinColor="red"
                            />
                        }
                        {trailEnd &&
                            <Marker
                                coordinate={{latitude: trailEnd.latitude, longitude: trailEnd.longitude}}
                                title="Your Destination."
                                pinColor="yellow"
                            />
                        }
                        {trailCoordinates.length > 0 && 
                            <Polyline
                                coordinates={trailCoordinates}
                                strokeColor="green"
                                strokeWidth={3}
                            />
                        }
                        </MapView>
                    </View>
                    {selectedTrail.additional_users && (!(selectedTrail.additional_users.includes(userInfo.id) || selectedTrail.user_id == userInfo.id)) && display &&
                        <TouchableOpacity style={{...styles.modal_menu_button, alignSelf:'center', backgroundColor:'#6E8AB8'}} onPress={handleAdditionToTrailList}>
                            <Text style={{...styles.search_button_title, fontSize: 18}}>Add to my Trails</Text>
                        </TouchableOpacity>
                    }
                    {selectedTrail.additional_users && (selectedTrail.additional_users.includes(userInfo.id) || selectedTrail.user_id == userInfo.id) && display &&
                        <TouchableOpacity style={{...styles.modal_menu_button, alignSelf:'center', backgroundColor:'gray'}}>
                            <Text style={{...styles.search_button_title, fontSize: 18}}>Add to my Trails {'\n'}(already added)</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={{...styles.modal_menu_button, alignSelf:'center', backgroundColor:'#6E8AB8', marginTop: 5}} onPress={handleDirections}>
                        <Text style={{...styles.search_button_title, fontSize: 18}}>Directions</Text>
                    </TouchableOpacity>
                    {selectedTrail.user_id == userInfo.id && display &&
                        <TouchableOpacity style={{...styles.modal_menu_button, alignSelf:'center', backgroundColor:'#dc343b', marginTop: 5}} onPress={handleDelete}>
                            <Text style={{...styles.search_button_title, fontSize: 18}}>Delete Trail</Text>
                        </TouchableOpacity>
                    }
                    {selectedTrail.user_id != userInfo.id && display &&
                        <TouchableOpacity style={{...styles.modal_menu_button, alignSelf:'center', backgroundColor:'#dc343b', marginTop: 5}} onPress={handleDelete}>
                            <Text style={{...styles.search_button_title, fontSize: 18}}>Remove Trail</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
        </SafeAreaView>
    );
}