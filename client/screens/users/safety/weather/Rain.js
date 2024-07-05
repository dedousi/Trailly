import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Rain({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Hiking with Rain
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                1. Always be prepared by waterproofing your backpack. All the gear should be 
                contained within weather-proof zip packs. Food should be inside good quality plastic bags
                in order to maintain it. An external pack cover will be also ideal for you to have. 
                In case of emergency a good quality garbage bag could also do the trick for waterproofing 
                your backpack.
                {'\n\n'}2. Rain gear should be waterproof, lightweight, and breathable. 
                {'\n\n'}3. Always carry extra pairs of socks. 
                {'\n\n'}4. Choose your footwear. Boots will keep you drier but are harder to dry and are
                more stiff. Hiking shoes and or trainers will get wet easily but they are easier to dry 
                and are more breathable.
                {'\n\n'}5. Always check the weather before starting a hike and keep a weather radio in 
                case the weather deteriorates. 
                {'\n\n'}6. Choose a shelter that can easily be set up in the rain without getting wet inside.
                {'\n\n'}7. Keep a layer of clothes for wearing to bed at night in order to not sleep in damp 
                or wet clothing.
                {'\n\n'}8. Dry river beds can fill very quickly and turn into raging rivers from heavy rains 
                that may be kilometres away from your current location. Hence, do not camp there.
                {'\n\n'}9. Pack your shelter in an easy to get position in your bag.
            </Text>
            </ScrollView>
        </SafeAreaView>
    );
}