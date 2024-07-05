import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../../../assets/StylesSheet';

export default function Safety({route, navigation}) {
    const { userInfo } = route.params;

    function handleSOSPress() {
        return navigation.navigate('SOS', {userInfo: userInfo}); 
    }

    function handleFirePress() {
        return navigation.navigate('Fire', {userInfo: userInfo});
    }

    function handleWeatherPress() {
        return navigation.navigate('Weather', {userInfo: userInfo});
    }

    function handleTrailPress() {
        return navigation.navigate('TrailIssues', {userInfo: userInfo});
    }

    return (
        <SafeAreaView style={styles.home_container}>
            <View>                
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleFirePress}>
                    <Image
                        source={require('../../../assets/icons/menu/fire_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Fire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleSOSPress}>
                    <Image
                        source={require('../../../assets/icons/menu/sos_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>S.O.S.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleWeatherPress}>
                    <Image
                        source={require('../../../assets/icons/menu/weather_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Unexpected Weather</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleTrailPress}>
                    <Image
                        source={require('../../../assets/icons/menu/trail_issues_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Trail Issues</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}