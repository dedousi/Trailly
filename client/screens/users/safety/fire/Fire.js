import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Fire({route, navigation}) {
    const { userInfo } = route.params;

    function handlePreparingForWildfires() {
        return navigation.navigate('Preparation', {userInfo: userInfo});
    }

    function handleWildfires() {
        return navigation.navigate('Wildfires', {userInfo: userInfo});
    }

    function handleCampfires() {
        return navigation.navigate('Campfires', {userInfo: userInfo});
    }

    return (
        <SafeAreaView style={styles.home_container}>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handlePreparingForWildfires}>
                <Image
                    source={require('../../../../assets/icons/menu/preparation.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>Preparation for Wildfires</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleCampfires}>
                <Image
                    source={require('../../../../assets/icons/menu/campfire.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>Campfires and tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleWildfires}>
                <Image
                    source={require('../../../../assets/icons/menu/wildfire.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>Encountering Wildfires</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}