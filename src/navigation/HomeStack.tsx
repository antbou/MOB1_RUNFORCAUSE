import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import TrackingScreen from '../screens/TrackingScreen';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeStack extends Component {
    constructor(props: any) {
        super(props);
    }

    Tab = createBottomTabNavigator();

    render() {
        return (
            <this.Tab.Navigator initialRouteName='Profile'>
                <this.Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"rocket"} color={color} size={size} />)
                }} />
                <this.Tab.Screen name="Tracking" component={TrackingScreen} options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"map"} color={color} size={size} />)
                }} />
            </this.Tab.Navigator>
        );
    }
}