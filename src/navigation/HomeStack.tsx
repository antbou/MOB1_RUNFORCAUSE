import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default class HomeStack extends Component {
    constructor(props: any) {
        super(props);
    }

    Tab = createBottomTabNavigator();

    render() {
        return (
            <this.Tab.Navigator initialRouteName='Home' >
                <this.Tab.Screen name="Home" component={HomeScreen} />
                <this.Tab.Screen name="Settings" component={SettingsScreen} />
            </this.Tab.Navigator>
        );
    }
}