import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Linking } from 'react-native';

import styles from '../../../assets/StylesSheet';

export default function Calls({route, navigation}) {
    
    const category = route.params.category;
    const [displayFireDepartmentNumber, setDisplayFireDepartmentNumber] = useState(false);
    const [displaySOSNumbers, setDisplaySOSNumbers] = useState(false);
    
    useEffect(() => { 
        if(category == 'fire') setDisplayFireDepartmentNumber(true);
        if(category == 'sos') setDisplaySOSNumbers(true);
    },[]);

    async function handleCall(phoneNumber) {
        const phoneNumberURL = `tel:${phoneNumber}`;
        await Linking.openURL(phoneNumberURL)
            .then(supported => {
                if (!supported) console.log('Phone number is not available for calling.');
            }).catch(error => console.log('An error occurred while making the call:', error));
    }

    if(category == 'fire' || category == 'sos') {
        return (
            <SafeAreaView style={styles.home_container}>
                <TouchableOpacity style={styles.rescue_button_3} onPress={() => handleCall(112)}>
                    <Text style={styles.modal_title}>Call 112 - Main Emergency Line</Text>
                </TouchableOpacity>
                {displayFireDepartmentNumber &&
                    <TouchableOpacity style={styles.rescue_button_2} onPress={() => handleCall(199)}>
                        <Text style={styles.modal_title}>Call 199 - Fire Department</Text>
                    </TouchableOpacity>
                }
                {displaySOSNumbers &&
                    <TouchableOpacity style={styles.rescue_button_2} onPress={() => handleCall(1016)}>
                        <Text style={styles.modal_title}>Call 1016 - Emergency Doctors</Text>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        );
    } else {
        Alert.alert('Forbidden', 'Looks like you have been redirected to a forbidden page.');
        return navigation.goBack();
    }
}