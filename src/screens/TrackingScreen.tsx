import React, { Component } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class TrackingScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.SafeAreaView}>
                <View style={{ flex: 1 }}>
                    <Text>TrackingScreen</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        backgroundColor: '#fff',
    },
});