import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';

import styles from '../../../assets/StylesSheet';
import RescueService from '../../../services/RescueService';

export default function Rescue({route, navigation}) {

    const userInfo = route.params.userInfo;
    const notificationCategory = route.params.notificationData.category;
    const reportID = route.params.notificationData.id;
    const [displayJoinButton, setDisplayJoinButton] = useState(true); 

    useEffect(() => { 
        async function hasJoined() {
            if(await RescueService.hasJoined(userInfo.id, reportID)) {
                setDisplayJoinButton(false);
            } else {
                setDisplayJoinButton(true);
            }
        };
        hasJoined();
    },[]);

    function handleAlertNearestAgenciesResponsible(category) {
        return navigation.navigate('Calls', {category: category});
    }
    
    async function joinVolunteers() {
        if(await RescueService.addVolunteer(reportID, userInfo.id)) {
            setDisplayJoinButton(false);
            await RescueService.isValid(reportID);
        }
    }
    
    function seeOtherTrails() {
        return navigation.navigate('NearTrails', {userInfo: userInfo});
    }

    if(notificationCategory == 'fire') {
        return (
            <SafeAreaView style={styles.basic_container}>
                <Text style={styles.rescue_title}>Dealing with Fire</Text>
                <TouchableOpacity 
                    style={styles.rescue_button_1} 
                    onPress={() => handleAlertNearestAgenciesResponsible(notificationCategory)}>
                    <Text style={styles.modal_title}>ALERT NEAREST AGENCIES RESPONSIBLE</Text>
                </TouchableOpacity>
                {displayJoinButton && (userInfo.id != "0") &&
                <TouchableOpacity 
                    style={styles.rescue_button_2} 
                    onPress={() => joinVolunteers(notificationCategory)}>
                    <Text style={styles.modal_title}>JOIN FIRE FIGHTING VOLUNTEERS</Text>
                </TouchableOpacity>
                }
                {(displayJoinButton == false) && (userInfo.id != "0") &&
                <TouchableOpacity 
                    style={styles.rescue_button_4} >
                    <Text style={styles.modal_title}>ALREADY JOINED FIRE FIGHTING VOLUNTEERS</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity 
                    style={styles.rescue_button_3} 
                    onPress={() => navigation.navigate('Fire', {userInfo: userInfo})}>
                    <Text style={styles.modal_title}>SEE WHAT TO DO IN CASE OF FIRE HERE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'red'}} 
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.modal_title}>CANCEL</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else if (notificationCategory == 'sos') {
        return (
            <SafeAreaView style={styles.basic_container}>
                <Text style={styles.rescue_title}>Dealing with SOS</Text>
                <TouchableOpacity 
                    style={styles.rescue_button_1} 
                    onPress={() => handleAlertNearestAgenciesResponsible(notificationCategory)}>
                    <Text style={styles.modal_title}>ALERT NEAREST AGENCIES RESPONSIBLE</Text>
                </TouchableOpacity>
                {displayJoinButton && (userInfo.id != "0") &&
                <TouchableOpacity 
                    style={styles.rescue_button_2} 
                    onPress={() => joinVolunteers(notificationCategory)}>
                    <Text style={styles.modal_title}>JOIN MEDICAL HELP VOLUNTEERS</Text>
                </TouchableOpacity>
                }
                {(displayJoinButton == false) && (userInfo.id != "0") &&
                <TouchableOpacity 
                    style={styles.rescue_button_4}>
                    <Text style={styles.modal_title}>ALREADY JOINED MEDICAL HELP VOLUNTEERS</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity 
                    style={styles.rescue_button_3} 
                    onPress={() => navigation.navigate('SOS', {userInfo: userInfo})}>
                    <Text style={styles.modal_title}>SEE WHAT TO DO IN CASE OF SOS HERE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'red'}} 
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.modal_title}>CANCEL</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else if ( notificationCategory == 'weather' || notificationCategory == 'storm' || 
                notificationCategory == 'heavy rainfall' || notificationCategory == 'extreme heat' || 
                notificationCategory == 'extreme cold' || notificationCategory == 'snowstorm' || 
                notificationCategory == 'blizzard' || notificationCategory == 'ice storm' || 
                notificationCategory == 'fog' || notificationCategory == 'hailstorm' || notificationCategory == 'high winds'
    ) {
        return (
            <SafeAreaView style={styles.basic_container}>
                <Text style={styles.rescue_title}>Dealing with Weather</Text>
                <TouchableOpacity 
                    style={styles.rescue_button_1} 
                    onPress={() => navigation.navigate('Weather', {userInfo: userInfo})}>
                    <Text style={styles.modal_title}>SEE WHAT TO DO IN CASE OF UNEXPECTED WEATHER HERE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.rescue_button_3} 
                    onPress={() => seeOtherTrails()}>
                    <Text style={styles.modal_title}>SEE OTHER TRAILS CLOSE TO YOU HERE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'red'}} 
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.modal_title}>CANCEL</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else if ( notificationCategory == 'landslide' || notificationCategory == 'broken bridge' || 
                notificationCategory == 'flood' || notificationCategory == 'trail' || notificationCategory == 'wrong signage'
    ) {
        return (
            <SafeAreaView style={styles.basic_container}>
                <Text style={styles.rescue_title}>Dealing with Trail Issues</Text>
                <TouchableOpacity 
                    style={styles.rescue_button_3} 
                    onPress={() => seeOtherTrails()}>
                    <Text style={styles.modal_title}>SEE OTHER TRAILS CLOSE TO YOU HERE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'red'}} 
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.modal_title}>CANCEL</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else {
        Alert.alert('Forbidden', 'Looks like you have been redirected to a forbidden page.');
        return navigation.goBack();
    }
}