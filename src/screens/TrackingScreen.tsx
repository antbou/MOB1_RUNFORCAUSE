
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import config from '../config/config.json';
import * as Location from 'expo-location';
import { Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { LocationGeocodedAddress, LocationObject } from 'expo-location';

export default function TrackingScreen() {
    const context = React.useContext(AuthContext);
    const [address, setAddress] = useState<LocationGeocodedAddress | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    return (
        <SafeAreaView >
            <MapView
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                region={{
                    latitude: region.latitude ?? 0,
                    longitude: region.longitude ?? 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
            >
                <Marker
                    coordinate={region}
                    title={address?.city ?? 'Unknown'}
                    description={`${address?.street ?? 'Unknown'} ${address?.streetNumber ?? ''}`}
                />
            </MapView>
        </SafeAreaView>
    );
}