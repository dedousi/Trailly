import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function SOS({route, navigation}) {
    const { userInfo } = route.params;
    
    function handleFirstAidKit() {
        return navigation.navigate('FirstAidKit',{userInfo: userInfo});
    }

    function handleWater() {
        return navigation.navigate('Water',{userInfo: userInfo});
    }

    return (
        <SafeAreaView style={styles.home_container}>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleFirstAidKit}>
                <Image
                    source={require('../../../../assets/icons/menu/first_aid.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>First Aid Kit Contents</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleWater}>
                <Image
                    source={require('../../../../assets/icons/menu/water.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>Water, Hydration and Filtering Tips</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}