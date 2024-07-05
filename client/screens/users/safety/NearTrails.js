import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import styles from '../../../assets/StylesSheet';
import RescueService from '../../../services/RescueService';

export default function NearTrails({route, navigation}) {
    
    const userInfo = route.params.userInfo;
    const [trails, setTrails] = useState([]);
    
    useEffect(() => { 
        async function fetchTrails() {
            const trails = await RescueService.getTrailsNearLocation(userInfo.id);
            setTrails(trails);
        };
        fetchTrails();
    }, []);

    function handleTrailSelection(trail_id, trail_coords, point, flag) {
        return navigation.navigate('RescueMap', {
            userInfo: route.params.userInfo, 
            trailID: trail_id,  
            point: point, 
            coords: trail_coords, 
            flag: flag
        });
    }

    return (
        <View style={styles.default_page}>
            <FlatList
                data={trails}
                keyExtractor={(item) => item.name.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.flatlist_row} onPress={() => {handleTrailSelection(item.id, item.coords, item.point, item.flag)}}>
                        <Text style={styles.flatlist_cell}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}