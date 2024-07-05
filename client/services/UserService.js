import { Alert } from 'react-native';
import uuid from 'react-native-uuid';

async function register(username, password) {
    
    const user = {
        id: uuid.v4(),
        username: username,
        password: password,
        role: "user",
        active: 0
    }

    try {
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            Alert.alert('Registration success!', 'You have been successfully registered!');
            return true;
        } else {
            Alert.alert('Invalid credentials','Looks like this username is already taken!');
            console.log('Username is already taken.');
        }
    } catch (error) {
        Alert.alert('Registration error.');
        console.log('Registration error: ', error);
    }
    return false;
};

async function login(username, password) {
    try {
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        console.log(response)
        if (response.ok) {
            const user = await response.json();
            return [user,true];
        } else {
            console.log('Invalid credentials given.');
            Alert.alert('Invalid credentials', 'Username or password is invalid. Try again.');
        }
    } catch (error) {
        Alert.alert('Login error.');
        console.log('Login error: ', error);
    }
    return [null,false];
};

async function logout(userInfo) {
    try {
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/user/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
        });
        if (response.ok) {
            Alert.alert('Logged out', 'You have been successfully logged out.');
            return true;
        } else {
            console.log('Could not logout.');
            Alert.alert('Error', 'Could not logout.');
        }
    } catch (error) {
        Alert.alert('Logout error.');
        console.log('Logout error: ', error);
    }
    return false;
};

const UserService = { 
    register, 
    login, 
    logout 
};
export default UserService;