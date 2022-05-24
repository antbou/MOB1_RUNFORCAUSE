import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TextInput, StyleSheet, Pressable, Button } from 'react-native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export default class AuthStack extends Component {

    Stack = createNativeStackNavigator();

    render() {
        return (
            <this.Stack.Navigator>
                <this.Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Se connecter' }} />
                <this.Stack.Screen name="SignUp" component={SignUpScreen} options={{
                    title: 'S\'inscrire'
                }} />
            </this.Stack.Navigator>
        );
    }
}