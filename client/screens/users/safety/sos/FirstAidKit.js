import React  from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import styles from '../../../../assets/StylesSheet';

export default function FirstAidKit({route, navigation}) {
    return (
        <SafeAreaView style={styles.info_container}>
        <ScrollView>
            <Text style={{...styles.default_title_bold, fontSize: 28}}>
                First Aid Kit Contents
            </Text>
            <Text style={{...styles.info_title, fontSize: 18}}>
                It is very important for a hiker to have a well prepared first aid kit. 
                What this first aid kit looks like for each foe will depend on several 
                factors; some of these include the likely issues that may arise during 
                the course of the trail or if there any known medical conditions. Each 
                first aid kit is unique, just like its owner. Yet there are some ingredients 
                to the mix that all should be considering bringing along with them.
                {'\n\n'}
                Before listing the said items, it is important to note that all those 
                items should be storedin a pack together that will be easily accessible 
                to the hiker. Also, since some of the individual items can be potentially 
                damaged if they get wet, they should be placed inside zip lock bags in 
                order to keep them dry and in good, usable condition. 
                {'\n\n'}
                <Text style={{...styles.info_title, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: '#dc343b'}}>
                    Something to remember:
                </Text>
                {'\t'} the first aid kit needs to be checked on a regular basis as the medications 
                could expire and be in need of replacement or the items could be used or 
                damaged. It is also important to note that one should not use items that 
                does not know how or why to use.
                {'\n\n'}1. Band-Aids of varying sizes and of good quality. They will be helpful for 
                small cuts, blisters etc. that might occur during the trip.
                {'\n\n'}2. 4-inch closure strips or butterfly closures for closing large wounds.
                4-inch strips are more effective than butterfly.
                {'\n\n'}3. 4 inch by 4 inch sterile dressing pads (5 to 10) for applying pressure 
                to a wound and stop the bleeding.
                {'\n\n'}4. Non-adherent sterile dressing (2 inch by 2 inch) to cover blisters, 
                burns or lacerations.
                {'\n\n'}5. Gauze roll.
                {'\n\n'}6. Antiseptic cream (e.g. Betadine) for cuts and wounds that could be 
                potentially infected.
                {'\n\n'}7. Multi-use tool or knife and or scissors.
                {'\n\n'}8. Forceps or tweezers for removing splinters, ticks and dirt from wounds.
                {'\n\n'}9. Thermometer.
                {'\n\n'}10. Safety pins.
                {'\n\n'}11. Lip balm and sunscreen.
                {'\n\n'}12. Insect repeler.
                {'\n\n'}13. A note pad and pencil.
                {'\n\n'}14. A small roll of duct tape.
                {'\n\n'}15. A pair of sterile gloves.
                {'\n\n'}16. Antiseptic wipes.
                {'\n\n'}17. Medication for pain relief and inflammation. (e.g. Ibuprofen)
                {'\n\n'}18. Aloe vera gel that can be found in packets or small bottles for 
                relief of minor burns.
                {'\n\n'}19. Masks.
                {'\n\n'}20. Space bag/blanket that can consist a lightweight emergency 
                shelter. For treating hypothermia victims.
                {'\n\n'}21. A first aid booklet.
            </Text>
            <Text style={{...styles.info_title, fontSize: 18, fontStyle: 'italic'}}>
                Of course more items can be added or some of those recommended could be excluded.
                This is just a list with commonly used important first aid items for you to reference.
            </Text>            
        </ScrollView>
        </SafeAreaView>
    );
}