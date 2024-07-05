import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Lightning({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Hiking with Lightning
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                1. When lightning strikes, make sure you are out of the way.
                {'\n\n'}2. If it is possible, seek shelter.
                {'\n\n'}3. Seek protection in a valley or in a depression in the terrain. 
                {'\n\n'}4. People in groups should find shelter at least 100 feet away from one another.
                {'\n\n'}5. Crouch on the ground with your weight on the balls of the feet, your feet together, 
                your head lowered and ears covered. 
                {'\n\n'}6. Never lie flat on the ground.
                {'\n\n'}7. Check weather reports before starting a hike.
                {'\n\n'}8. Watch distant clouds for lightning.
                {'\n\n'}9. Listen for thunder.
                {'\n\n'}10. Get down from high places.
                {'\n\n'}11. Put on your raingear and remove your backpack. 
                {'\n\n'}12. If you have a metal, leave it 100 feet from where you are seeking shelter.
                {'\n\n'}13. Do a headcount of everyone in your party.
                {'\n\n'}14. It is safe to touch someone that has been struck by lightning.
            </Text>
            </ScrollView>
        </SafeAreaView>
    );
}