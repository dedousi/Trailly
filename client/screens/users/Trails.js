import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../../assets/StylesSheet';

export default function Trails({route, navigation}) {

    async function handleTrails() {
        return navigation.navigate('MyTrails', route.params);
    }

    async function handleUpload() {
        return navigation.navigate('UploadTrail', route.params);
    }

    function handleTrailRec() {
        return navigation.navigate('RecordTrail', route.params);
    }

    return (
        <SafeAreaView style={styles.home_container}>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleTrails}>
                <Image
                    source={require('../../assets/icons/menu/trail_logo.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>My Trail List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleUpload}>
                <Image
                    source={require('../../assets/icons/menu/upload_trail_logo.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>Upload a New Trail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleTrailRec}>
                <Image
                    source={require('../../assets/icons/menu/record_trail_logo.png')}
                    style={styles.info_logo}
                />
                <Text style={{...styles.default_title, fontSize: 20}}>Record a Trail</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}