import React, { useState } from 'react';
import { TextInput, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';

import styles from '../assets/StylesSheet';
import UserService from '../services/UserService';

export default function Login({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleLogin() {    
        const result = await UserService.login(username, password); 
        if(result[1]) { 
            return navigation.navigate('Home', {userInfo: result[0]});
        }
    }

    return (
        <SafeAreaView style={styles.basic_container}>
            <Image
                source={require('../assets/icons/logo.png')}
                style={styles.default_logo}
                resizeMode='contain'
            />
            <Text style={{fontSize: 30}}>Login:</Text>
            <TextInput
                style={styles.login_input}
                onChangeText={(text) => setUsername(text)}
                placeholder='Username'
            />
            <TextInput
                style={styles.login_input}
                onChangeText={(text) => setPassword(text)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
                <Text style={{...styles.default_title, fontSize: 20, color: '#fff8e7'}}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}