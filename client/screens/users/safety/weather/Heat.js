import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Heat({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Hiking with Hot Weather
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Dehydration:{'\t\t\n'}
                </Text>
                Early signs and symptoms may include:{'\t\t\n'}
                {'\t\t'} &#x2022; Feeling thirsty and lightheaded. {'\n'}
                {'\t\t'} &#x2022; Dry mouth. {'\n'}
                {'\t\t'} &#x2022; Tiredness. {'\n'}
                {'\t\t'} &#x2022; Dark colored, strong-smelling urine. {'\n'}
                If you are under the assumption that you are dehydrated, drink plenty of fluids, rest 
                and try to find some shade. Also try cooling yourself by soaking your hat or shirt.
                If you are finding it difficult to keep water down because you are vomiting, try 
                drinking in small amounts more frequently. If left untreated, severe dehydration can 
                be serious and can cause seizures, brain damage and or death.
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Hydration:{'\t\t\n'}
                </Text>
                One should also be careful of hydration also. Hyponatremia (abnormally low sodium
                levels in the blood) may occur if a hiker drinks too much water without adequately 
                replenishing electrolytes. In order to hydrate properly, try keeping track of the
                following:
                {'\n'}1. Do not wait until you are thirsty to drink water.
                {'\n'}2. Use sunscreen, hats and stay in the shade. In general, try to keep cool. 
                A warm environment always brings the thirst levels up.
                {'\n'}3. During hot and largely shadeless conditions where water sources are scarce, 
                do the bulk of your hiking while the temperatures are cooler (e.g. early morning, late 
                afternoon and early evening).
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Heat Exhaustion:{'\t\t\n'}
                </Text>
                Signs and symptoms may include:{'\t\t\n'}
                {'\t\t'} &#x2022; Dizziness. {'\n'}
                {'\t\t'} &#x2022; Tiredness. {'\n'}
                {'\t\t'} &#x2022; Headaches. {'\n'}
                {'\t\t'} &#x2022; Weakness. {'\n'}
                {'\t\t'} &#x2022; Fever. {'\n'}
                {'\t\t'} &#x2022; Fast breathing or heartbeat. {'\n'}
                {'\t\t'} &#x2022; Feeling thirsty and lightheaded. {'\n'}
                {'\t\t'} &#x2022; Excessive sweating. {'\n'}
                {'\t\t'} &#x2022; Skin becoming pale and clammy {'\n'}
                {'\t\t'} &#x2022; A heat rash. {'\n'}
                {'\t\t'} &#x2022; Cramps in the arms, legs and stomach. {'\n'}
                If someone is showing signs of heat exhaustion they need to be cooled down and given fluids.
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Tips:{'\t\t\n'}
                </Text>
                1. During hot and largely shadeless conditions where water sources are scarce, 
                do the bulk of your hiking while the temperatures are cooler (e.g. early morning, late 
                afternoon and early evening).
                {'\n\n'}2. Cover your head
                {'\n\n'}3. Use sunscreen.
                {'\n\n'}4. Wear sunglasses.
                {'\n\n'}5. Cover up, there is no need to get sunburned. Instead, just wear light and
                breathable, cooling clothes.
                {'\n\n'}6. Wear breathable shoes and socks.
                {'\n\n'}7. Wear light colored clothing as darker clothes tend to attract heat.
                {'\n\n'}8. Hydrate with caution.
                {'\n\n'}9. Learn to recognize how your body is reacting to the additional heat 
                and make sure you know what to do.
                {'\n\n'}10. Take breaks often.
                {'\n\n'}11. Be prepared with the according gear for fires.
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
}