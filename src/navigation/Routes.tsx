import React, { Component, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import HomeStack from './HomeStack';
import SplashScreen from '../screens/SplashScreen';

export default class Routes extends Component<any, any> {
    static contextType = AuthContext;

    child: any;
    state = {
        isLoadingFinished: false,
    }


    constructor(props: any) {
        super(props);
        this.child = React.createRef();
        this.setLoading = this.setLoading.bind(this);
    }

    setLoading(isLoading: boolean) {
        console.log(isLoading + 'loading')
        this.setState({ isLoadingFinished: isLoading });
    }

    componentDidMount() {
        console.log(this.child)
        if (this.context.loading == false && this.child.current != null) {
            this.child.current.start()
        }
    }

    componentDidUpdate() {
        if (this.context.loading == false && this.child.current != null) {
            this.child.current.start()
        }
    }

    render() {
        if (this.state.isLoadingFinished == false) {
            return (
                <SplashScreen ref={this.child} loading={this.setLoading} />
            )
        }

        if (this.state.isLoadingFinished && this.context.loading == false) {
            return (
                <NavigationContainer>
                    {this.context.user.isLoggedIn ? (<HomeStack />) : (<AuthStack />)}
                </NavigationContainer>
            )
        }
    }
}