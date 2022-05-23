import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import config from '../config/config.json';
import axios from 'axios';
import StoreHelper from '../expo/StoreHelper';


interface IMyState {
    user: {
        email: string,
        isLoggedIn: boolean,
    }
}

/**
 * This provider is created to access user in the whole app.
 */

export const AuthContext = React.createContext({});

export default class AuthProvider extends Component<any, IMyState>{

    Stack = createNativeStackNavigator();

    state: IMyState = {
        user: { email: '', isLoggedIn: false },
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        this.alreadyLoggedIn();
    }

    handleChange(user: any) {
        this.setState({ user });
    }

    /**
     * This method is called to verify if the user is already logged in.
     */
    async alreadyLoggedIn() {
        const token = await StoreHelper.get('token');
        await axios.get(config.apiUrlCheckToken, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async (response: { data: any; }) => {
            this.handleChange({ email: response.data.email, isLoggedIn: true });
        }).catch((error: any) => {
            this.handleChange({ email: '', isLoggedIn: false });
        });
    }

    /**
     * This methi is called when the user clicks the submit button to login.
     * @param email 
     * @param password 
     */
    async signIn(email: string, password: string) {
        await axios.post(config.apiUrlToken, {
            username: email,
            password: password
        }).then(async (response) => {
            const token = response.data;
            await StoreHelper.save('token', token);
            this.handleChange({ email: email, isLoggedIn: true });
        }).catch((error: any) => {
            console.log(error);
            throw error;
        });
    }

    render() {
        return (
            <AuthContext.Provider value={{ user: this.state.user, handleChange: this.handleChange, login: this.signIn }}>
                {this.props.children}
            </AuthContext.Provider >
        );
    }
}