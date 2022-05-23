import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack';
import SplashScreen from '../screens/SplashScreen';

export default class Routes extends Component<any, any> {
    static contextType = AuthContext;

    constructor(props: any) {
        super(props);
    }

    render() {
        let content = this.context.loading ? <SplashScreen /> : this.context.user.isLoggedIn ? (<HomeStack />) : (<AuthStack />);

        return (
            <NavigationContainer>
                {content}
            </NavigationContainer>
        );
    }
}