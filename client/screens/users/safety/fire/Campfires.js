import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Campfires({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Campfires and Tips
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                1. Only use fires where permitted and when it is safe to do so. You have to 
                know if the weather conditions and your trail allow you to build and light a 
                fire. If there are "high fire danger" warnings or a total fire ban or even 
                if it is just windy, then fires are not allowed, if not illegal.
                {'\n\n'}2. Do not burn metal or plastic. Some of your other trash could be ok to burn
                such as small pieces of paper.
                {'\n\n'}3. If you are using a camping stove, make sure it's on level, solid ground 
                before you ignite it and generally don't start open fires in the woods 
                outside of designated ring fire installations if there are any. 
                {'\n\n'}4. If there is no established fire ring to use and you still want to build a fire, 
                lay a ground cloth out and cover it with 3-5 inches of soil from a source which was 
                already disturbed, such as the root area of a toppled tree. Build a small fire on top 
                of this soil. When completely extinguished, disperse the soil that is on top of the 
                cloth.
                {'\n\n'}5. If (3) cannot be done, only use dead branches and wood that has already fallen onto
                the ground to build a fire and do it at least 3 meters (=10 feet) away from any form 
                of vegetation. Ensure that you chosen area that is clear of leaf litter and any other 
                fuel source. 
                {'\n\n'}6. Make sure that you always keep your fire under constant watch and control. 
                {'\n\n'}7. When you are done with the lit fire, carefully douche the fire with water and 
                stand where the steam won't burn you as you pour, stir the ashes and apply more water. 
                Keep dousing, stirring and breaking apart embers until all remnants of the fire 
                are cool to human touch.
                {'\n\n'}8. Do not light fires under low hanging trees. Fires must be positioned to open spaces.
                {'\n\n'}9. Keep your fire to a reasonable size. There is no need for grandeur, you need just 
                enough of a fire in order to cook something small or create a bit of warmth.
                {'\n\n'}10. Rocks help create a contained area for your fire but only if building a fire ring does
                not destroy the natural habitat. Do not use rocks that have been taken from waterways or
                were very close to water sources. The water content in them can cause them to explode when
                they come in contact with flames.
                {'\n\n'}11. Do not use liquid fuel to light up a fire such as kerosene or petrol. 
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
}