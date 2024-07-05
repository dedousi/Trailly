import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Weather({route, navigation}) {
    const { userInfo } = route.params;
    
    function handleRain() {
        return navigation.navigate('Rain',{userInfo: userInfo});
    }

    function handleHeat() {
        return navigation.navigate('Heat',{userInfo: userInfo})
    }

    function handleCold() {
        return navigation.navigate('Cold',{userInfo: userInfo})
    }

    function handleLightning() {
        return navigation.navigate('Lightning',{userInfo: userInfo})
    }

    return (
        <SafeAreaView style={styles.home_container}>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleRain}>
                <Image
                    source={require('../../../../assets/icons/menu/rain.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 18}}>Hiking with Rain</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleHeat}>
                <Image
                    source={require('../../../../assets/icons/menu/heat.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 18}}>Hiking with Hot Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleCold}>
                <Image
                    source={require('../../../../assets/icons/menu/cold.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 18}}>Hiking with Cold Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleLightning}>
                <Image
                    source={require('../../../../assets/icons/menu/lightning.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 18}}>Hiking with Lightning</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}