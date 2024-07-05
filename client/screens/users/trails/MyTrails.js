import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import styles from '../../../assets/StylesSheet';
import TrailService from '../../../services/TrailService';

export default function TrailManager({navigation, route}) {

    const [trails, setTrails] = useState(null);
    
    useEffect(() => { 
        const fetchTrails = async () => {
            const trails = await TrailService.fetchUserTrails(route.params.userInfo.id);
            setTrails(trails);
        };
        fetchTrails();
    },[]);

    function handleTrailSelection(trail_id) {
        return navigation.navigate('ExploreSelectedTrail', {userInfo: route.params.userInfo, trailID: trail_id});
    }

    return (
        <View style={styles.default_page}>
            <Text style={{...styles.default_title_bold, fontSize: 18}}>My Trails:</Text>
            <FlatList
                data={trails}
                keyExtractor={(item) => item.filename.toString()}
                renderItem={({item}) => (
                    <View>
                        <TouchableOpacity style={styles.flatlist_row} onPress={() => {handleTrailSelection(item.id)}}>
                            <Text style={styles.flatlist_cell}>{item.filename}</Text>
                            <Text style={styles.flatlist_cell}>{item.for_use}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.flatlist_header}>
                        <Text style={{...styles.flatlist_header_text, marginLeft: 60}}>Trail Name</Text>
                        <Text style={{...styles.flatlist_header_text, marginRight: 82}}>Use</Text>
                    </View>
                )}
            />
        </View>
    );
}