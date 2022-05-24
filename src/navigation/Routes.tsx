import React, { Component, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack';
import SplashScreen from '../screens/SplashScreen';

interface IMyState {
    isAnimationFinish: boolean;
}

export default class Routes extends Component {
    static contextType = AuthContext;

    state: IMyState = {
        isAnimationFinish: false,
    }

    constructor(props: any) {
        super(props);
        this.setAnimationFinish = this.setAnimationFinish.bind(this);
    }

    setAnimationFinish(isLoading: boolean) {
        this.setState({ isAnimationFinish: isLoading });
    }

    render() {
        // Display Splash Screen as long as the app is loading and the animation is not finished
        if (!this.state.isAnimationFinish) {
            return (
                <SplashScreen setAnimationFinish={this.setAnimationFinish} loading={this.context.loading} />
            )
        }
        return (
            <NavigationContainer>
                {this.context.user.isLoggedIn ? (<HomeStack />) : (<AuthStack />)}
            </NavigationContainer>
        )
    }
}