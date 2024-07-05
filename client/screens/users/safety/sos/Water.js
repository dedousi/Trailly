import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function Water({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                Water, Hydration and Filtering Tips
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: '#dc343b'}}>
                    Something to remember:{'\t\t'}
                </Text>
                In general an average human can survive around three days without water, 
                yet, the actual period varies depending on the physique of the person and 
                the environment. It is important to note that the average water consumption 
                daily for an adult should be on average 2 to 2.5 litres per day.
                {'\n\n'}
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
                    Finding water:{'\t\t\n'}
                </Text>
                Trails will not always have a water bubblers or taps which provide water on a 
                regular basis. Thus, one must always bring his own water bottle. In big hikes, 
                the amount of water needed cannot be carried by the hiker due to its weight. Thus, 
                one must know how to find and make water drinkable. The water you find during a 
                hike is important to remember that no matter how clean it looks, it could always 
                contain germs and or parasites that are undiscoverable with naked human eyes.
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold', color: '#dc343b'}}>
                    {'\t'} Always filter water no matter how clean it looks.
                </Text>
                {'\n\n'}
                Natural water sources are a way to go for getting water. Dams, creeks and rivers 
                are a good way to get your resupply of water. That is why, you should always 
                study your map well before going on a hike; one must know the where such sources 
                can be reached from the trail. However, natural water sources can be seasonal and 
                not always be reliable.
                {'\n\n'}
                You should - if possible - avoid drinking water from sources that run through
                farms as they may contain animal or chemical contamination. Try also to avoid 
                water sources that are stagnant, foamy or have animal faeces.   
                {'\n\n'}
                In case there is a patch of green or a damp spot in an otherwise dry creek bed, 
                that means that water lies close to its surface. You should dig a hole and if it fills 
                up with water, scoop it out with your cooking pot or place a shirt into the hole,
                soak it up and wring it to get the water out filtered.
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold'}}>
                    Filtering:{'\t\t\n'}
                </Text>
                The most common forms of water purification are:
                {'\n\t\t'} &#x2022; UV Lights.
                {'\n\t\t'} &#x2022; Gravity Filters.
                {'\n\t\t'} &#x2022; Straw Filters.
                {'\n\t\t'} &#x2022; Pumps.
                {'\n\t\t'} &#x2022; Chemicals that can be added to the water.
                {'\n\n'}
                Water with lots of particles will generally take longer to filter than clean water.
                {'\n\n'}
                Filtering is good, but not always enough, thus we need to consider pre-filtering.
                If you are desperate and have no choice, use a bandanna, a coffee filter or a stocking 
                to pre-filter the big chunks out of your dirty water source and if you are carrying 
                extra fuel, it would probably be to boil the water in order to sterilize it.
            </Text>
        </ScrollView>
        </SafeAreaView>
    );
}