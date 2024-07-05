import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Cold({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Hiking with Cold Weather
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Getting cold:{'\t\t\n'}
                </Text>
                Signs and symptoms may include:{'\t\t\n'}
                {'\t\t'} &#x2022; Feeling cold. {'\n'}
                {'\t\t'} &#x2022; Uncontrollable shivering. {'\n'}
                {'\t\t'} &#x2022; Exhaustion. {'\n'}
                {'\t\t'} &#x2022; Cool and pale skin. {'\n'}
                {'\t\t'} &#x2022; Shivering. {'\n'}
                If getting cold progresses, the person could develop hypothermia. 
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Hypothermia:{'\t\t\n'}
                </Text>
                Signs and symptoms may include:{'\t\t\n'}
                {'\t\t'} &#x2022; Feeling cold. {'\n'}
                {'\t\t'} &#x2022; Pale, cold and dry skin. {'\n'}
                {'\t\t'} &#x2022; Blue or gray skin and lips. {'\n'}
                {'\t\t'} &#x2022; Slurred speech. {'\n'}
                {'\t\t'} &#x2022; Slow breathing. {'\n'}
                {'\t\t'} &#x2022; Tiredness. {'\n'}
                {'\t\t'} &#x2022; Confusion. {'\n'}
                If the person is suspected to have hypothermia, then he has to be moved to a 
                shelter immediately. Wet clothes should be removed and they should be wrapped
                in a blanket, sleeping bag or dry towel (the head should be also covered). They
                need to be kept awake and given something warm, non-alcoholic to drink and sugary
                foods. {'\n'}
                Do not rub the person in order to warm them up and also do not try to warm them up
                with heat lamps, hot water bottles or hot baths. {'\n'}
                It is important to note that if the person progresses into severe hypothermia, 
                shivering usually stops. Symptoms of severe hypothermia include slowing of the heart 
                rate and breathing, dilated pupils and coma. Without treatment the condition is 
                likely to lead to death.
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Frostbite:{'\t\t\n'}
                </Text>
                Fingers, nose, ears and toes, are most commonly affected by it. {'\n'}
                During the early stage of frostbite (frostnip), you may experience:{'\t\t\n'}
                {'\t\t'} &#x2022; Pins and needles. {'\n'}
                {'\t\t'} &#x2022; Throbbing in the affected area. {'\n'}
                {'\t\t'} &#x2022; Aching in the affected area. {'\n'}
                {'\t\t'} &#x2022; Cold, numb and white skin. {'\n'}
                {'\t\t'} &#x2022; A tingling sensation. {'\n'}
                After the frostnip, prolonged exposure to cold will cause:{'\t\t\n'}
                {'\t\t'} &#x2022; More tissue damage. {'\n'}
                {'\t\t'} &#x2022; The affected area will feel hard and frozen. {'\n'}
                If the frostbite turns severe the symptoms are:{'\t\t\n'}
                {'\t\t'} &#x2022; White, blue or blotchy skin. {'\n'}
                {'\t\t'} &#x2022; The tissue feels hard and cold to touch. {'\n'}
                {'\t\t'} &#x2022; Further damage beneath the skin. {'\n'}
                {'\t\t'} &#x2022; Thick black scabs in the area. 
                {'\n'} At this stage, it's likely that some tissue will die (necrosis). {'\n'}
                Long-term effects of frostbite:{'\t\t\n'}
                {'\t\t'} &#x2022; Increased sensitivity to cold. {'\n'}
                {'\t\t'} &#x2022; Numbness. {'\n'}
                {'\t\t'} &#x2022; Reduced sense of touch. {'\n'}
                {'\t\t'} &#x2022; Persistent pain. {'\n'}
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Tips:{'\t\t'}
                </Text>
                {'\n\n'}1. Avoid alcohol.
                {'\n\n'}2. Remove any wet clothing.
                {'\n\n'}3. Manage your clothes layering system.
                {'\n'}Your baselayer should be thin, breathable and made out of fabrics like merino wool or synthetics. 
                Do not use cotton for a base layer.
                {'\n'}Your middle layers should keep your body heat, so a good choice is to wear something like a puffy jacket.
                {'\n'}Your top layer should be ideally made from a waterproof fabric with seam-sealed construction.
                {'\n\n'}4. Do not sweat. Strip down or layer up as needed to maintain maximum warmth without sweating. 
                {'\n\n'}5. Set up a tent and lay inside your sleeping bag.
                {'\n\n'}6. Have something warm and sweet to drink or eat.
                {'\n\n'}7. Always check the weather forecast and trail conditions before hiking.
                {'\n\n'}8. Invest in quality winter clothing.
                {'\n\n'}9. Stay hydrated & snack frequently.
                {'\n\n'}10. Always pack microspikes just in case.
                {'\n\n'}11. Keep moving.
                {'\n\n'}12. Hiking in the sun will keep you warmer than hiking in the shade.
                {'\n\n'}13. Get yourself some winter boots.
                {'\n\n'}14. Choose socks that are not made from cotton but still are warm.
                {'\n\n'}15. If you are hiking in snow, wear a pair of gaiters.
                {'\n\n'}16. Sun protection is still important.
                {'\n\n'}17. A fully charged headlamp could be very useful.
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
}