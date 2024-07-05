import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Modal, Alert, Image, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Notifications from 'expo-notifications';

import styles from '../../../assets/StylesSheet';
import MapService from '../../../services/MapService';
import TrailService from '../../../services/TrailService';
import ReportService from '../../../services/ReportService';
import AppService from '../../../services/AppService';
import NotificationService from '../../../services/NotificationService';

export default function Map({route, navigation}) {
    
    const trailID = route.params.trailID;
    const userInfo = route.params.userInfo;
    const [mapRef, setMapRef] = useState(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [drivingModalVisible, setDrivingModalVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);
    const [selectedNotificationData, setSelectedNotificationData] = useState(null);
    const [displayDrivingDirections, setDisplayDrivingDirections] = useState(false);
    const [displayNoResults, setDisplayNoResults] = useState(false);
    const [displayAdditionToList, setDisplayAdditionToList] = useState(false);
    const [safeHiking, setSafeHiking] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const [foundResults, setFoundResults] = useState(false);
    const [initialRegion, setInitialRegion] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedTrails, setSearchedTrails] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [trailCoordinates, setTrailCoordinates] = useState([]);
    const [drivingCoordinates, setDrivingCoordinates] = useState([]);
    const [trailStart, setTrailStart] = useState(null);
    const [trailEnd, setTrailEnd] = useState(null);
    const [averageTrailMiddle, setAverageTrailMiddle] = useState(null);
    const [displayModalList, setModalVisible] = useState(false); 
    const flatListRef = useRef(null);

    useEffect(() => {
        if (searchedTrails.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: 0, animated: true });
        }
    }, [searchedTrails]);
    
    useEffect(() => {
        async function initializeMap() {
            if(trailID == null) {
                setInitialRegion(await MapService.getCurrentLocation());
            } else {
                const trail = await TrailService.fetchTrail(trailID);
                getTrailDetails(trail[0]);
                if(!(trail[0].additional_users.includes(userInfo.id) || trail[0].user_id == userInfo.id) || userInfo.id == "0" || userInfo == null) setDisplayAdditionToList(false);
            }
        }
        initializeMap();
    }, []);

    useEffect (() => {
        async function getNotifications() {
            const currentLocation = await AppService.getLocation();
            const distance = MapService.getDistanceFromLatLonInKm(currentLocation.latitude, currentLocation.longitude, averageTrailMiddle.latitude, averageTrailMiddle.longitude);
            if(distance <= 30) { // 30KM range for receiving notifications
                await NotificationService.registerForPushNotifications(userInfo.id);
                await NotificationService.sendNotifications();
            }
        }
        if(safeHiking && averageTrailMiddle) getNotifications();
        // timer of 20 sec for refreshing the notifications
        const interval = setInterval(() => {
            if (safeHiking && averageTrailMiddle) getNotifications();
        }, 20000); // 20 seconds in milliseconds
        return () => clearInterval(interval);
    },[safeHiking && averageTrailMiddle]);

    Notifications.addNotificationResponseReceivedListener( response => {
        const { actionIdentifier, notification } = response;
        if (actionIdentifier == 'expo.modules.notifications.actions.DEFAULT') {
            const data = notification.request.content.data;
            setSelectedNotificationData(data);
            setNotificationModalVisible(true);
        }
    });

    async function getTrailDetails(trail) {
        const results = await MapService.getTrail(trail);
        setSearchModalVisible(false);
        if(results != []) {
            setTrailCoordinates(results[0]);
            setDrivingCoordinates(results[1]);
            setTrailStart(results[2]);
            setTrailEnd(results[3]);
            if (drivingCoordinates != null || drivingCoordinates != []) setDrivingModalVisible(true);
            setAverageTrailMiddle(MapService.calculateMiddleCoordinates(results[0]));
            setInitialRegion(MapService.getInitialRegion(results[0]));
        } else {
            Alert.alert('Error', 'Something went wrong while fetching the trail.');
            navigation.goBack();
        }
    }

    function handleExploreTrailsPress() {
        setSearchModalVisible(false);
        return navigation.navigate('ExploreTrails', route.params);
    }

    async function handleSearch() {
        let results = await TrailService.searchTrails(userInfo.id, searchQuery);
        results = results.flat();
        if (results.length > 0) {
            setFoundResults(true);
            setSearchedTrails(results);
            setSelectedResult({id: results[0].id, name: results[0].filename});
            setDisplayAdditionToList(userInfo.id === '0' ? false : true);
            setSafeHiking(true);
        } else {
            setFoundResults(false);
            setDisplayNoResults(true);
        }
        if (results.length == 1) Alert.alert('Only 1 search result was found!');
    };

    async function handleSeeTrailOnMap() {
        const trail = searchedTrails.find(item => item.id === selectedResult.id);
        getTrailDetails(trail);
    }

    function handleSeeDetails() {
        setSearchModalVisible(false);
        return navigation.navigate('ExploreSelectedTrail', {userInfo: userInfo, trailID: selectedResult.id});
    }

    async function handleAdditionToTrailList() {
        await TrailService.addAdditionalUsers(userInfo.id, selectedResult.id);
        setDisplayAdditionToList(false);
    }

    function handleReverseTrail() {
        let coords = trailCoordinates.slice().reverse();
        let exStart = trailStart;
        let exEnd = trailEnd;
        setTrailStart(exEnd);
        setTrailEnd(exStart);
        setTrailCoordinates(coords);
    }

    async function handleDrivingDirectionsDisplay(flag) {
        const userLocation = await MapService.getCurrentLocation();
        const distance = MapService.getDistanceFromLatLonInKm(trailStart.latitude, trailStart.longitude, userLocation.latitude, userLocation.longitude);
        if( drivingCoordinates.length > 0 && distance > 1 ) {
            setDisplayDrivingDirections(flag == true ? true : false);
            if(flag) mapRef.animateToRegion(userLocation);
            setDrivingModalVisible(false);
        } else {
            Alert.alert('No driving directions','Either you are closer than 1km to your location, or there are no available driving directions to your trail.');
            setDisplayDrivingDirections(false);
            setDrivingModalVisible(false); 
        }
    }

    async function handleQuickAlerts(flag) {
        setAlertModalVisible(false);
        if(flag) ReportService.addReport(alertType,'',trailID,userInfo.id);
    }

    async function handleTakeAction(data) {
        setNotificationModalVisible(false);
        return navigation.navigate('Rescue', {userInfo: userInfo, notificationData: data});
    }

    return (
        <View style={styles.map_container}>
            {initialRegion && 
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    ref={(ref) => setMapRef(ref)}
                >
                    {trailStart &&
                        <Marker
                            coordinate={{latitude: trailStart.latitude, longitude: trailStart.longitude}}
                            title="Trail Start."
                            pinColor="blue"
                        />
                    }
                    {trailEnd &&
                        <Marker
                            coordinate={{latitude: trailEnd.latitude, longitude: trailEnd.longitude}}
                            title="Trail End."
                            pinColor="red"
                        />
                    }
                    {(trailCoordinates.length > 0 ) && 
                        <Polyline
                            coordinates={trailCoordinates}
                            strokeColor="green"
                            strokeWidth={3}
                        />
                    }
                    {(drivingCoordinates.length > 0) && displayDrivingDirections &&
                        <Polyline
                            coordinates={drivingCoordinates}
                            strokeColor="orange"
                            strokeWidth={5}
                        />
                    }
                </MapView>  
            }
            <View style={styles.overlay_map}>
                <TouchableOpacity  style={styles.button}  onPress={() => setSearchModalVisible(true)}>
                    <Image
                        source={require('../../../assets/icons/map/search.png')}
                        style={styles.overlay_button_search}
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
                {(trailCoordinates.length > 0) &&
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => mapRef.animateToRegion(MapService.getInitialRegion(trailCoordinates))}>
                        <Image
                            source={require('../../../assets/icons/map/see_trail.png')}
                            style={styles.overlay_button}
                            resizeMode="contain" 
                        />
                    </TouchableOpacity>
                }
                {safeHiking && (trailCoordinates.length > 0) &&
                    <TouchableOpacity style={styles.button} onPress={() => setSafeHiking(false)}>
                        <Image
                            source={require('../../../assets/icons/map/safe_on.png')}
                            style={styles.overlay_button}
                            resizeMode="contain" 
                        />
                    </TouchableOpacity>
                }
                {!safeHiking && (trailCoordinates.length > 0) &&
                    <TouchableOpacity style={styles.button} onPress={() => setSafeHiking(true)}>
                        <Image
                            source={require('../../../assets/icons/map/safe_off.png')}
                            style={styles.overlay_button}
                            resizeMode="contain" 
                        />
                    </TouchableOpacity>
                }
                {displayDrivingDirections && (drivingCoordinates.length > 0) &&
                    <TouchableOpacity style={styles.button} onPress={() => handleDrivingDirectionsDisplay(false)}>
                        <Image
                            source={require('../../../assets/icons/map/driving_on.png')}
                            style={styles.overlay_button}
                            resizeMode="contain" 
                        />
                    </TouchableOpacity>
                }
                {!displayDrivingDirections && (drivingCoordinates.length > 0) &&
                    <TouchableOpacity style={styles.button} onPress={() => handleDrivingDirectionsDisplay(true)}>
                        <Image
                            source={require('../../../assets/icons/map/driving_off.png')}
                            style={styles.overlay_button}
                            resizeMode="contain" 
                        />
                    </TouchableOpacity>
                }
                {(trailCoordinates.length > 0) &&
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => handleReverseTrail()}>
                        <Image
                            source={require('../../../assets/icons/map/reverse.png')}
                            style={styles.overlay_button}
                            resizeMode="contain" 
                        />
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.button} onPress={() => {setAlertType('trail'); setAlertModalVisible(true);}}>
                    <Image
                        source={require('../../../assets/icons/map/trail_alert.png')}
                        style={styles.overlay_button}
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {setAlertType('fire'); setAlertModalVisible(true);}}>
                    <Image
                        source={require('../../../assets/icons/map/fire.png')}
                        style={styles.overlay_button}
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {setAlertType('weather'); setAlertModalVisible(true);}}>
                    <Image
                        source={require('../../../assets/icons/map/weather.png')}
                        style={styles.overlay_button}
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {setAlertType('sos'); setAlertModalVisible(true);}}>
                    <Image
                        source={require('../../../assets/icons/map/sos.png')}
                        style={styles.overlay_button}
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={searchModalVisible}
                    onRequestClose={() => { setSearchModalVisible(false); }}
                >
                    <View style={styles.to_from_search_container}>
                        <View style={styles.to_from_search}>
                            <SearchBar
                                placeholder='Search hiking trails'
                                onChangeText={(text) => setSearchQuery(text)}
                                value={searchQuery}
                                containerStyle={styles.search_container}
                                style={{fontSize: 16}}
                            />
                            <TouchableOpacity 
                                style={{...styles.modal_menu_button, alignSelf: 'center'}} 
                                onPress={handleSearch}>
                                <Text style={styles.modal_title}>Search</Text>
                            </TouchableOpacity>
                            {!foundResults && displayNoResults &&
                                <Text style={{color: '#fff'}}>There are no available hiking trails related to your search in our database.</Text>
                            }
                            {foundResults &&
                                <View>
                                    <Text style={{color: '#fff'}}>Select from results:</Text>
                                    <TouchableOpacity
                                        style={styles.white_button}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Text>{selectedResult ? `Selected: ${selectedResult.name}` : 'Select an option'}</Text>
                                    </TouchableOpacity>
                                    <Modal
                                        visible={displayModalList}
                                        transparent={true}
                                        animationType="slide"
                                        onRequestClose={() => setModalVisible(false)}
                                    >
                                        <View style={styles.dropdown_view}>
                                            <View style={styles.dropdown_view2}>
                                                <FlatList
                                                    style={styles.dropdown_container}
                                                    ref={flatListRef}
                                                    data={searchedTrails}
                                                    keyExtractor={(item) => item.id.toString()}
                                                    renderItem={({ item, index }) => (
                                                        <TouchableOpacity
                                                            style={styles.dropdown_item}
                                                            onPress={() => {
                                                                setSelectedResult({ id: item.id, name: item.filename });
                                                                setModalVisible(false);
                                                            }}
                                                        >
                                                            <Text style={{fontSize: 16}}>{item.filename}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    initialScrollIndex={0}
                                                    getItemLayout={(data, index) => (
                                                        { length: 50, offset: 50 * index, index }
                                                    )}
                                                />
                                            </View>
                                        </View>
                                    </Modal>
                                    <TouchableOpacity 
                                        style={{...styles.modal_menu_button, alignSelf:'center', backgroundColor:'green'}} 
                                        onPress={handleSeeTrailOnMap}>
                                        <Text style={styles.search_button_title}>See Trail on Map</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={{...styles.modal_menu_button, marginTop: 5, alignSelf:'center', backgroundColor:'green'}} 
                                        onPress={handleSeeDetails}>
                                        <Text style={styles.search_button_title}>Details</Text>
                                    </TouchableOpacity>
                                    {displayAdditionToList && 
                                        <TouchableOpacity 
                                            style={{...styles.modal_menu_button, marginTop: 5, alignSelf:'center', backgroundColor:'green'}} 
                                            onPress={handleAdditionToTrailList}>
                                            <Text style={styles.search_button_title}>Add to Trail List</Text>
                                        </TouchableOpacity>
                                    }
                                    <TouchableOpacity 
                                        style={{...styles.modal_menu_button, marginTop: 5, alignSelf:'center', backgroundColor: 'green'}} 
                                        onPress={handleReverseTrail}>
                                        <Text style={styles.search_button_title}>Reverse Trail Directions</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <TouchableOpacity style={{...styles.modal_menu_button, marginTop: 20}} onPress={handleExploreTrailsPress}>
                            <Text style={styles.modal_title}>Explore More Trails Here</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.modal_menu_button, marginTop: 20}} onPress={() => setSearchModalVisible(false)}>
                            <Text style={styles.modal_title}>Close Search</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View>
                    <Modal 
                        animationType="slide"
                        transparent={true}
                        visible={drivingModalVisible}
                        onRequestClose={() => { setDrivingModalVisible(false); }}
                    >
                        <View style={styles.driving_container}>
                            <Text style={{fontSize: 18, paddingHorizontal: 20}}>Do you wish to see driving directions to trail start?</Text>
                            <TouchableOpacity 
                                style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'#2B9D70'}} 
                                onPress={() => handleDrivingDirectionsDisplay(true)}>
                                <Text style={styles.modal_title}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'#dc343b'}} 
                                onPress={() => handleDrivingDirectionsDisplay(false)}>
                                <Text style={styles.modal_title}>NO</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 13, fontStyle: 'italic', paddingHorizontal: 40, marginTop: 5}}>You can always activate them from the button later on.</Text>
                        </View>
                    </Modal>
                </View>
                {alertType &&
                    <View>
                        <Modal 
                            animationType="slide"
                            transparent={true}
                            visible={alertModalVisible}
                            onRequestClose={() => { setAlertModalVisible(false); }}
                        >
                            <View style={styles.driving_container}>
                                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Do you really want to make this alert?</Text>
                                <TouchableOpacity 
                                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'#2B9D70'}} 
                                    onPress={() => handleQuickAlerts(true)}>
                                    <Text style={styles.modal_title}>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'#dc343b'}} 
                                    onPress={() => handleQuickAlerts(false)}>
                                    <Text style={styles.modal_title}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                }  
                {selectedNotificationData &&
                    <View>
                        <Modal 
                            animationType="slide"
                            transparent={true}
                            visible={notificationModalVisible}
                            onRequestClose={() => { setNotificationModalVisible(false); }}
                        >
                            <View style={styles.notification_container}>
                                    <Text style={{fontSize: 25, paddingHorizontal: 20, fontWeight: 'bold', marginTop: 40, marginBottom: 10}}>{selectedNotificationData.title}</Text>
                                    <Text style={{fontSize: 16, paddingHorizontal: 20, marginTop: 10, marginBottom: 10}}>{selectedNotificationData.location_txt}</Text>
                                    {(selectedNotificationData.user_txt != "") &&
                                        <View style={{flexGrow: 1, alignItems: 'center', height: 20, width: 300, backgroundColor: '#fff', borderColor: '#ffbb00', borderRadius: 25, borderWidth: 3}}>
                                            <Text>{selectedNotificationData.user_txt}</Text>
                                        </View>
                                    }
                                <TouchableOpacity 
                                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'#2B9D70'}} 
                                    onPress={() => handleTakeAction(selectedNotificationData)}>
                                    <Text style={styles.modal_title}>TAKE ACTION</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{...styles.modal_menu_button, marginTop: 10, backgroundColor:'#dc343b'}} 
                                    onPress={() => setNotificationModalVisible(false)}>
                                    <Text style={styles.modal_title}>CLOSE</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                } 
            </View>   
        </View>
    );
};