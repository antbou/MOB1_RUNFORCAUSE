import React, { Component } from 'react';
import AuthProvider from './AuthProvider';
import Routes from './Routes';

export default class Providers extends Component {

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