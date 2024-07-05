import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Preparation({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Preparation for Wildfires
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                1. If there is an active fire near the hiking area and you are informed 
                about it, by any means, do not attempt to hike in the area.
                {'\n\n'}2. If your hiking trail is in the path of the smoke coming from a wildfire, 
                do not attempt to hike that trail either.
                {'\n\n'}3. Check your news website and the weather conditions for the hiking area 
                before you head out for the hiking trail.
                {'\n\n'}4. Study alternative hiking routes near your hiking trail beforehand.
                {'\n\n'}5. Get yourself an In-Reach device which helps you communicate in locations
                where there is no cell phone signal. A device like this, will be your 
                savior in case you see a wildfire or smoke nearby.
                {'\n\n'}6. Pack along with the rest of your gear, personal locator beacons, face masks 
                and weather alert radios, thick soled boots, medications (if asthmatic of with 
                respiratory problems) and signal mirrors, all just in case you get caught in 
                the midst of a wildfire.
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
}