import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';

import styles from '../../../assets/StylesSheet';
import TrailService from '../../../services/TrailService';

export default function ExploreTrails({route, navigation}) {
    
    const [trails, setTrails] = useState([]);
    
    useEffect(() => { 
        async function fetchTrails() {
            const trails = await TrailService.fetchAllPublicTrails();
            setTrails(trails);
        };
        fetchTrails();
    }, []);

    function handleTrailSelection(trail_id) {
        return navigation.navigate('ExploreSelectedTrail', {userInfo: route.params.userInfo, trailID: trail_id});
    }

    return (
        <SafeAreaView style={styles.default_page}>
            <FlatList
                data={trails}
                keyExtractor={(item) => item.filename.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.flatlist_row} onPress={() => {handleTrailSelection(item.id)}}>
                        <Text style={styles.flatlist_cell}>{item.filename}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}