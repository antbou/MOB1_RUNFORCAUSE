import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import TrackingScreen from '../screens/TrackingScreen';

export default class HomeStack extends Component {
    constructor(props: any) {
        super(props);
    }

    Tab = createBottomTabNavigator();

    render() {
        return (
            <this.Tab.Navigator initialRouteName='Profile' >
                <this.Tab.Screen name="Profile" component={ProfileScreen} />
                <this.Tab.Screen name="Tracking" component={TrackingScreen} />
            </this.Tab.Navigator>
        );
    }
}