import React from 'react';
import { View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';

import styles from '../assets/StylesSheet';

export default function Start({navigation}) {
    
    function handleLoginPress() {
        return navigation.navigate('Login'); 
    }

    function handleRegisterPress() {
        return navigation.navigate('Registration');
    }

    function handleGuestPress() {
        const userInfo = {
            id: '0',
            username: 'guest',
            password: 'guest',
            role: 'guest'
        }
        return navigation.navigate('Home', { userInfo: userInfo });
    }

    return(
        <SafeAreaView style={styles.default_page}>
            <View>
                <Image
                    source={require('../assets/icons/logo.png')}
                    style={styles.default_logo}
                    resizeMode="contain"
                />
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleLoginPress}>
                    <Image
                        source={require('../assets/icons/menu/login_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 18}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleRegisterPress}>
                    <Image
                        source={require('../assets/icons/menu/register_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 18}}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.default_button, flexDirection: 'row'}} onPress={handleGuestPress}>
                    <Image
                        source={require('../assets/icons/menu/guest_logo.png')}
                        style={styles.info_logo}
                    />
                    <Text style={{...styles.default_title, fontSize: 18}}>Continue as a Guest</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}