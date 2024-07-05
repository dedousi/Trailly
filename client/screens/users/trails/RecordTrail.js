import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import styles from '../../../assets/StylesSheet';

export default function RecordTrail({route, navigation}) {

    const [location, setLocation] = useState(null);
    const [trail, setTrail] = useState([]);
    const [startRecording, setStartRecording] = useState(false);
  
    useEffect(() => {
      let intervalId;
      if(startRecording) {
        intervalId = setInterval(async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
    
          Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
            (newLocation) => {
              let latitude = newLocation.coords.latitude;
              let longitude = newLocation.coords.longitude;
              let point = {latitude, longitude};
              setLocation(point);
              setTrail(prevTrail => [...prevTrail, point]);
            }
          );
        }, 10000); // Execute every 10 seconds (10000 milliseconds)
      }
      return () => { clearInterval(intervalId); };
    });
    
    function handleSaveRecordedTrail() {
      setStartRecording(false);
      return navigation.navigate('SaveRecordedTrail',{ userInfo: route.params.userInfo, coords: trail });
    }

    return (
      <View style={styles.home_container}>
        <TouchableOpacity style={styles.rescue_button_2} onPress={() => setStartRecording(true)}>
            <Text style={{...styles.default_title, fontSize: 18}}>Start Recording</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rescue_button_3} onPress={() => setStartRecording(false)}>
            <Text style={{...styles.default_title, fontSize: 18}}>Stop Recording</Text>
        </TouchableOpacity>
        {(trail.length != 0) &&
          <TouchableOpacity style={styles.rescue_button_1} onPress={handleSaveRecordedTrail}>
            <Text style={{...styles.default_title, fontSize: 18}}>Save Recorded Trail</Text>
          </TouchableOpacity>
        }
        {startRecording &&
          <Text style={{...styles.default_title, fontSize: 14}}>Route Recording has started.</Text>
        }
        {!startRecording &&
          <Text style={{...styles.default_title, fontSize: 14}}>Route Recording has stopped.</Text>
        }
      </View>
    );
}