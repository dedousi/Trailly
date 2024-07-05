import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Wildfires({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Encountering Wildfires
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                1. It is important not to panic. Clear thinking is what is needed if you are 
                caught in a fire.
                {'\n\n'}2. Do not try to outrun the fire. If you see flames, retreat in the opposite direction.
                {'\n\n'}3. Find a cleared area with rocks, hollows, embankments, streams or roads to 
                protect you and avoid hilltops and vegetation.
                {'\n\n'}4. Keep your head and body low and cover your skin. Natural fabrics are the 
                way to go, other fabrics can melt and cause burns since they are in contact with
                your skin.
                {'\n\n'}5. Cover your mouth with a damp cloth.
                {'\n\n'}6. Hydrate. It is important.
                {'\n\n'}7. If you see a column of smoke rather than just a general haze, you can make some 
                educated guesses about the type and direction of fire that is causing it. 
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    White smoke 
                </Text>
                {'\t'} usually indicates finer, fast-burning fuels. That means 
                that we have a fast-moving fire that generally will burn for a short duration.
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Dark smoke 
                </Text>
                {'\t'} indicates thick brush or timber. This means it could be a 
                longer-lasting fire. Embers can be carried aloft, sparking fires farther ahead. 
                Embers can even be carried over fire breaks like rivers or highways.
                {'\n\n'}8. The larger the column of smoke, the greater the fire. If you see the smoke column 
                growing bigger, get out of the area. The direction that a smoke column bends 
                indicates the direction the fire is moving, so head the other way if possible.
                {'\n\n'}9. If the atmosphere has a yellow or orange or red hue around you, breathing will be 
                unhealthy and it might be time to leave. Wear a damp cloth in front of your mouth or 
                a mask.
                {'\n\n'}10. Fires go uphill faster than downhill.
                {'\n\n'}11. If you can safely travel over already-blackened earth, it can be a good way to go
                because the fire will likely be headed away from you and there will be little to no fuel 
                to attract it back to your way. If you do so, watch out for possible falling trees and 
                be careful not to step in hot ash pockets as ground heat can melt your soles.
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
}