import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../../assets/StylesSheet';

export default function Explore({route, navigation}) {
    
    const [display, setDisplay] = useState(false);
    useEffect (() => {
        if (route.params.userInfo.role == 'user') setDisplay(true);
    }, []);

    function handleMap() {
        return navigation.navigate('Map', {userInfo: route.params.userInfo, trailID: null}); 
    }

    function handleExplore() {
        return navigation.navigate('ExploreTrails', route.params);
    }

    function handleMyTrails() {
        return navigation.navigate('MyTrails', route.params);
    }

    return (
        <SafeAreaView style={styles.home_container}>
            <View>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleMap}>
                    <Image
                        source={require('../../assets/icons/menu/map_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>View the Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleExplore}>
                    <Image
                        source={require('../../assets/icons/menu/explore_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Explore Available Trails</Text>
                </TouchableOpacity>
                {display &&
                    <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleMyTrails}>
                        <Image
                            source={require('../../assets/icons/menu/trail_logo.png')}
                            style={styles.info_logo}
                        />
                        <Text style={{...styles.default_title, fontSize: 20}}>My Trail List</Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
}