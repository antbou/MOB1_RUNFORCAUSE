

import { AuthContext } from '../navigation/AuthProvider';
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import config from '../config/config.json';
import StoreHelper from '../expo/StoreHelper';


export default function TrackingScreen() {

    const context = React.useContext(AuthContext);
    const [location, setLocation] = useState<Location.LocationObject>();
    const [isWatching, setIsWatching] = useState(false);


    useEffect(() => {
        toggleWatching();
        watchPosition();
    }, []);

    const sendLocation = async (location: Location.LocationObject) => {
        if (await StoreHelper.get('isWatching') === 'false') return;
        await axios.post(config.server + '/api/rfc/location?',
            {
                lat: location.coords.latitude,
                long: location.coords.longitude,
            }, {
            headers: {
                Authorization: `Bearer ${context.user.token}`
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const watchPosition = async () => {
        Location.getForegroundPermissionsAsync().then(async (perm) => {
            if (!perm.granted) {
                await Location.requestForegroundPermissionsAsync().catch(console.error);
            }
            const options: Location.LocationOptions = {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000 * 5,
            };
            Location.watchPositionAsync(options, async (location) => {
                setLocation(location);
                console.log('Location: ' + location.coords.latitude + ' ' + location.coords.longitude);
                await sendLocation(location);
            });
        });
    }

    const saveWatchingState = async (isWatching: string) => {
        await StoreHelper.save('isWatching', isWatching);
    }

    const toggleWatching = async () => {
        setIsWatching((await StoreHelper.get('isWatching') === 'true'));
    }


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitudeDelta: 0.0922, // Default value
                    longitudeDelta: 0.0421, // Default value
                    latitude: location?.coords.latitude ?? 0,
                    longitude: location?.coords.longitude ?? 0,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                showsUserLocation={true}
                showsCompass={false}
                loadingEnabled={true}
            />
            <Pressable style={styles.button} onPress={async () => {
                await saveWatchingState(`${!(await StoreHelper.get('isWatching') === 'true')}`);
                toggleWatching();
            }}>
                <Text style={styles.text}>{isWatching ? "Arréter" : "Démarrer"}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        paddingVertical: 5,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase',
    },
});