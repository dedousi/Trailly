import * as Notifications from 'expo-notifications';
import { Linking, BackHandler, Alert } from 'react-native';

import MapService from './MapService';
import AppService from './AppService';

const projectId = '980b3ef5-e8f7-45d6-9b86-a5281f5f4fab';
let alreadyNotifiedReports = [];

async function clearReportHistory() {
    alreadyNotifiedReports = []
}

async function registerForPushNotifications(user_id) {
    let token = '';
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted'){
            console.log('Permission to allow notifications was denied.');
            Alert.alert(
                'Permission Required',
                'This app requires notifications to be allowed for full functionality. Please go to settings and allow notifications.',
                [
                    {
                        text: 'Go to Settings',
                        onPress: () => Linking.openSettings(),
                    },
                    {
                        text: 'Cancel',
                        onPress: () => {console.log('User canceled'); BackHandler.exitApp();},
                        style: 'cancel',
                    },
                ],
            );
            return registerForPushNotifications();
        }
        const expoToken = await Notifications.getExpoPushTokenAsync({ projectId });
        token = expoToken.data;
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/user/set_notification_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user_id, notification_token: token })
        });
        if(response.ok) {
            return true;
        }
    } catch (error) {
        console.error('Error getting a push token', error);
    }
    return false;
}

async function fetchReportsForNotifications() {
    try{
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/report/get_active_reports`);
        if(response.ok) {
            const data = await response.json();
            return data;
        } else{
            Alert.alert('Error', 'There was a problem fetching notifications.');
            console.log('There was a problem fetching the reports for notifications.');
        }
    } catch (error) {
        Alert.alert('Error', 'There was a problem fetching the reports for notifications.');
        console.log('There was a problem fetching the reports for notifications: ', error);
    }
    return null;
}

function getNotificationContent(report) {  
    let title;
    if(report.category == 'fire') {
        title = 'Fire Alert';
    } else if (report.category == 'sos') {
        title = 'S.O.S';
    } else if (report.category == 'trail') {
        title = 'Trail Issue';
    } else if (report.category == 'landslide') {
        title = 'Landslide Alert';
    } else if (report.category == 'broken bridge') {
        title = 'Broken Bridge Alert';
    } else if (report.category == 'flood') {
        title = 'Flood Alert';
    } else if (report.category == 'wrong signage') {
        title = 'Wrong Signage Alert';
    } else if (report.category == 'weather') {
        title = 'Weather Alert';
    } else if (report.category == 'storm') {
        title = 'Storm Alert';
    } else if (report.category == 'heavy rainfall') {
        title = 'Heavy Rainfall Alert';
    } else if (report.category == 'extreme heat') {
        title = 'Extreme Heat Alert';
    } else if (report.category == 'extreme cold') {
        title = 'Extreme Cold Alert';
    } else if (report.category == 'snowstorm') {
        title = 'Snowstorm Alert';
    } else if (report.category == 'blizzard') {
        title = 'Blizzard Alert';
    } else if (report.category == 'ice storm') {
        title = 'Ice Storm Alert';
    } else if (report.category == 'fog') {
        title = 'Fog Alert';
    } else if (report.category == 'high winds') {
        title = 'High Winds Alert';
    } else if (report.category == 'hailstorm') {
        title = 'Hailstorm Alert';
    }
    
    const location = JSON.parse(report.location);
    let body1 = `Location: 
                    \t altitude: ${location.altitude},
                    \t latitude: ${location.latitude},
                    \t longitude: ${location.longitude} 
                `;
    let body2 = "";
    if(report.text != "") { 
       body2 = `\nUser wrote: ${report.text}\n`;
    }
    let body = body1 + body2;
    
    const notificationContent = {
        title: title,
        body: body,
        badge: 1,
        sticky: false,
        data: { id: report.id, location: report.location, category: report.category, location_txt: body1, user_txt: report.text, title: title }
    }
    return notificationContent;
}

async function sendNotifications() {
    const reports = await fetchReportsForNotifications();
    const differentElements = reports.filter(item => !alreadyNotifiedReports.includes(item.id));
    const currentLocation = await AppService.getLocation();
    differentElements.forEach(async (report) => {
        const location = JSON.parse(report.location);
        const distance = MapService.getDistanceFromLatLonInKm(currentLocation.latitude, currentLocation.longitude, location.latitude, location.longitude);
        if(distance <= 30) { // 30KM range for receiving notifications
            const notificationContent = getNotificationContent(report);
            try {
                await Notifications.scheduleNotificationAsync({
                    content: notificationContent,
                    trigger: null, 
                });
                Notifications.addNotificationReceivedListener(notification => {
                    console.log('Received notification:', notification);
                    Notifications.setNotificationHandler({
                        handleNotification: async () => ({
                            shouldShowAlert: true,
                            shouldPlaySound: true,
                            shouldSetBadge: true,
                        }),
                    });
                });
                alreadyNotifiedReports.push(report.id);
            } catch (error) {
                console.error('Error sending a push notification', error);
            }
        }
    });
}

async function sendNotificationToUser(user_id) {
    try {
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/user/get_user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id })
        });
        if (response.ok) {
            const user = await response.json();
            const token = user.token;

            const message = {
                to: token,
                sound: 'default',
                title: 'Help is on its way!',
                body: 'A volunteer team is taking action!',
            };

            await Notifications.scheduleNotificationAsync({
                content: message,
                trigger: null, 
            });
            Notifications.addNotificationReceivedListener(notification => {
                console.log('Received notification:', notification);
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: true,
                    }),
                });
            });
            console.log('Notification sent successfully.');
        } else {
            console.log('Failed to retrieve user notification token.');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

async function sendNotificationToVolunteer(user_id) {
    try {
        const response = await fetch(`https://gobbler-tough-monkfish.ngrok-free.app/user/get_user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id })
        });
        if (response.ok) {
            const user = await response.json();
            const token = user.token;

            const message = {
                to: token,
                sound: 'default',
                title: 'Volunteer team was made!',
                body: 'It is your time to take action!',
            };

            await Notifications.scheduleNotificationAsync({
                content: message,
                trigger: null, 
            });
            Notifications.addNotificationReceivedListener(notification => {
                console.log('Received notification:', notification);
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: true,
                    }),
                });
            });
            console.log('Notification sent successfully.');
        } else {
            console.log('Failed to retrieve user notification token.');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

const NotificationService = { 
    registerForPushNotifications,
    sendNotifications, 
    sendNotificationToUser,
    sendNotificationToVolunteer,
    clearReportHistory
};
export default NotificationService;