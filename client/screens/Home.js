import React, { useEffect } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, BackHandler, Image } from 'react-native';

import styles from '../assets/StylesSheet';
import UserService from '../services/UserService';

export default function Home({route, navigation}) {
   
    /*
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; });
        return () => backHandler.remove();
    }, []);
    */
   
    const { userInfo } = route.params;
    console.log("logged in user:", userInfo);

    function handleExploreMapPress() {
        return navigation.navigate('Explore', {userInfo: userInfo}); 
    }

    function handleReportPress() {
        return navigation.navigate('Report', {userInfo: userInfo});
    }

    function handleSafetyTipsPress() {
        return navigation.navigate('Safety', {userInfo: userInfo});
    }

    function handleTrailsPress() {
        return navigation.navigate('Trails', {userInfo: userInfo});
    }

    function handleLoginPress() {
        return navigation.navigate('Login');
    }

    function handleRegisterPress() {
        return navigation.navigate('Registration');
    }

    function handleLogoutPress() {
        if(UserService.logout(userInfo)) {
            return navigation.navigate('Start');
        }
    }

    if (userInfo.role == 'admin') {
        return (
            <SafeAreaView style={styles.home_container}>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleLogoutPress}>
                    <Image
                        source={require('../assets/icons/menu/logout_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else if (userInfo.role == 'user') {
        return (
            <SafeAreaView style={styles.home_container}>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleExploreMapPress}>
                    <Image
                        source={require('../assets/icons/menu/map_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>View Map and Search Trails</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleTrailsPress}>
                    <Image
                        source={require('../assets/icons/menu/trail_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Upload/Record/Manage Trails</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleReportPress}>
                    <Image
                        source={require('../assets/icons/menu/report_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Alert for Unexpected Situation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleSafetyTipsPress}>
                    <Image
                        source={require('../assets/icons/menu/tips_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Safety Tips</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleLogoutPress}>
                    <Image
                        source={require('../assets/icons/menu/logout_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else if (userInfo.role == 'guest') {
        return (
            <SafeAreaView style={styles.home_container}>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleExploreMapPress}>
                    <Image
                        source={require('../assets/icons/menu/map_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>View Map and Search Trails</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleReportPress}>
                    <Image
                        source={require('../assets/icons/menu/report_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Alert for Unexpected Situation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleSafetyTipsPress}>
                    <Image
                        source={require('../assets/icons/menu/tips_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 20}}>Safety Tips</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    } else {
        Alert.alert('Forbidden', 'Looks like you have been redirected to a forbidden page.');
        return navigation.navigate('Start');
    };
}