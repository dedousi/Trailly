import React, { useState } from 'react';
import { Alert, TextInput, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';

import styles from '../assets/StylesSheet';
import UserService from '../services/UserService';

export default function Registration({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    
    async function handleRegistration() {
        if(password.toLowerCase() != passwordConfirmation.toLowerCase()) {
            console.log('Passwords do not match. \n password1:',password,'\n password2:',passwordConfirmation);
            Alert.alert('Invalid credentials', 'Passwords do not match.');
        } else if(password.replace(/\s+/g, '') == "" || username.replace(/\s+/g, '') == ""){
            console.log('Not entered credetials');
            Alert.alert('Missing credentials', 'Please fill the password and username fields.');
        } else {
            const flag = await UserService.register(username, password)
            if(flag) {
                return navigation.navigate('Start');
            }
        }
    };

    return (
        <SafeAreaView style={styles.basic_container}>
            <Image
                source={require('../assets/icons/logo.png')}
                style={styles.default_logo}
                resizeMode='contain'
            />
            <Text style={{fontSize: 30}}>Register:</Text>
            <TextInput
                style={styles.login_input}
                onChangeText={(text) => setUsername(text)}
                placeholder='Set a username'
            />
            <TextInput
                style={styles.login_input}
                onChangeText={(text) => setPassword(text)}
                placeholder='Set a password'
                secureTextEntry={true}
            />
            <TextInput
                style={styles.login_input}
                onChangeText={(text) => setPasswordConfirmation(text)}
                placeholder='Confirm password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.login_button} onPress={handleRegistration}>
                <Text style={{...styles.default_title, fontSize: 20, color: '#fff8e7'}}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}