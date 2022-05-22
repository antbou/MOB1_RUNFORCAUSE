import React, { Component } from 'react';
import AuthProvider from './AuthProvider';
import Routes from './Routes';

interface IMyState {
    user: {
        username: string,
        isLoggedIn: boolean,
    }
}

export default class Providers extends Component<any, IMyState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <AuthProvider>
                <Routes />
            </AuthProvider>
        );
    }
}