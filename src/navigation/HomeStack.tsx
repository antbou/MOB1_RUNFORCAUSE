import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackingScreen from '../screens/TrackingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default class HomeStack extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Tab.Navigator initialRouteName='Profile' screenOptions={{
                tabBarHideOnKeyboard: true,
            }}>
                <Tab.Screen name="Profile" component={ProfileStack} options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"rocket"} color={color} size={size} />),
                    headerShown: false,
                    tabBarLabel: 'Profil',
                }} />
                <Tab.Screen name="Tracking" component={TrackingScreen} options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"map"} color={color} size={size} />)
                }} />
            </Tab.Navigator>
        );
    }
}