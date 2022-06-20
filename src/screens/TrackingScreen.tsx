

import { AuthContext } from '../navigation/AuthProvider';
import React from 'react';
import { View, StyleSheet, Pressable, Text, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';


export default function TrackingScreen() {
    const context = React.useContext(AuthContext);
    const [location, setLocation] = useState<Location.LocationObject>();


    useEffect(() => {
        Location.getForegroundPermissionsAsync().then(async (perm) => {
            if (!perm.granted) {
                await Location.requestForegroundPermissionsAsync().catch(console.error);
            }
            const options: Location.LocationOptions = {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000 * 5,
            };
            Location.watchPositionAsync(options, (location) => {
                setLocation(location);
                console.log('Location: ' + location.coords.latitude + ' ' + location.coords.longitude);
                // axios.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`;
                // axios.post(config.apiUrl + 'location', {
                //   lat: location.coords.latitude,
                //   long: location.coords.longitude,
                // }).catch(console.error);
            });
        });
    }, []);

    return (
        <SafeAreaView >
            <MapView
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                region={{
                    latitudeDelta: 0.0922, // Default value
                    longitudeDelta: 0.0421, // Default value
                    latitude: location?.coords.latitude ?? 0,
                    longitude: location?.coords.longitude ?? 0,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
            />
            {/* </MapView> */}
        </SafeAreaView>
    );
}