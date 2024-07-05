import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from '../screens/Start';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Home from '../screens/Home';

import Explore from '../screens/users/Explore';
import Report from '../screens/users/Report';
import Trails from '../screens/users/Trails';

import Rescue from '../screens/users/safety/Rescue';
import Safety from '../screens/users/safety/Safety';
import RescueMap from '../screens/users/safety/RescueMap';
import NearTrails from '../screens/users/safety/NearTrails';
import Calls from '../screens/users/safety/Calls';

import SOS from '../screens/users/safety/sos/SOS';
import Water from '../screens/users/safety/sos/Water';
import FirstAidKit from '../screens/users/safety/sos/FirstAidKit';

import Fire from '../screens/users/safety/fire/Fire';
import Preparation from '../screens/users/safety/fire/Preparation';
import Campfires from '../screens/users/safety/fire/Campfires';
import Wildfires from '../screens/users/safety/fire/Wildfires';

import Weather from '../screens/users/safety/weather/Weather';
import Heat from '../screens/users/safety/weather/Heat';
import Cold from '../screens/users/safety/weather/Cold';
import Rain from '../screens/users/safety/weather/Rain';
import Lightning from '../screens/users/safety/weather/Lightning';

import TrailIssues from '../screens/users/safety/trail/TrailIssues';

import UploadTrail from '../screens/users/trails/UploadTrail';
import MyTrails from '../screens/users/trails/MyTrails';
import RecordTrail from '../screens/users/trails/RecordTrail';
import SaveRecordedTrail from '../screens/users/trails/SaveRecordedTrail';

import Map from '../screens/users/map/Map';
import ExploreTrails from '../screens/users/map/ExploreTrails';
import ExploreSelectedTrail from '../screens/users/map/ExploreSelectedTrail';

const Stack = createStackNavigator();

export default function Navigation() {  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{ headerLeft: null }}/>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />

        <Stack.Screen name="Home" component={Home} options={{ headerLeft: null,  gestureEnabled: false }} />
        
        <Stack.Screen name="Safety" component={Safety} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Trails" component={Trails} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Rescue" component={Rescue} />
        <Stack.Screen name="NearTrails" component={NearTrails} />
        <Stack.Screen name="Calls" component={Calls} />
        
        <Stack.Screen name="SOS" component={SOS} />
        <Stack.Screen name="FirstAidKit" component={FirstAidKit} />
        <Stack.Screen name="Water" component={Water} />

        <Stack.Screen name="Fire" component={Fire} />
        <Stack.Screen name="Preparation" component={Preparation} />
        <Stack.Screen name="Campfires" component={Campfires} />
        <Stack.Screen name="Wildfires" component={Wildfires} />

        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Rain" component={Rain} />
        <Stack.Screen name="Lightning" component={Lightning} />
        <Stack.Screen name="Cold" component={Cold} />
        <Stack.Screen name="Heat" component={Heat} />

        <Stack.Screen name="TrailIssues" component={TrailIssues} />
        
        <Stack.Screen name="UploadTrail" component={UploadTrail} />
        <Stack.Screen name="MyTrails" component={MyTrails} />
        <Stack.Screen name="RecordTrail" component={RecordTrail} />
        <Stack.Screen name="SaveRecordedTrail" component={SaveRecordedTrail} />

        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="RescueMap" component={RescueMap} />

        <Stack.Screen name="ExploreTrails" component={ExploreTrails} />
        <Stack.Screen name="ExploreSelectedTrail" component={ExploreSelectedTrail} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};