import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack';

export default class Routes extends Component<any, any> {
    static contextType = AuthContext;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                {this.context.user.isLoggedIn ?
                    (<HomeStack />) :
                    (<AuthStack />)}
            </NavigationContainer>
        );
    }
}