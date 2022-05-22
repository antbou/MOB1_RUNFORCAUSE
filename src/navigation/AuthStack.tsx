import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';

export default class AuthStack extends Component {

    Stack = createNativeStackNavigator();

    render() {
        return (
            <this.Stack.Navigator>
                <this.Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Se connecter' }} />
            </this.Stack.Navigator>
        );
    }
}