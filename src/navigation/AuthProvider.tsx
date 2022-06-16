import React, { Component, createContext, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import config from '../config/config.json';
import axios from 'axios';
import StoreHelper from '../expo/StoreHelper';


interface IContextInterface {
    user: {
        email: string,
        name: string,
        picture: string,
        phone: string,
        isLoggedIn: boolean,
    },
    setUser: (user: any) => void;
    authenticate: (username: string, password: string) => void;
    patchUser: (user: any) => void;
    loading: boolean
}

interface IUser {
    email: string,
    name: string,
    picture: string,
    phone: string,
    isLoggedIn: boolean,
}

/**
 * This provider is created to access user in the whole app.
 */

export const AuthContext = React.createContext<IContextInterface>(null as any);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser>({
        email: '',
        name: '',
        picture: '',
        phone: '',
        isLoggedIn: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tokenVerify();
    }, []);

    const tokenVerify = async () => {
        const token = await StoreHelper.get('token');
        await axios.get(config.apiUrlCheckToken, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async (response: { data: any; }) => {
            setUser({
                email: response.data.email,
                name: response.data.name,
                picture: response.data.picture,
                phone: response.data.phone,
                isLoggedIn: true
            });
        }).catch((error: any) => {
            setUser({
                email: '',
                name: '',
                picture: '',
                phone: '',
                isLoggedIn: false
            });
        });
        setLoading(false);
    }

    const authenticate = async (email: string, password: string) => {
        await axios.post(config.apiUrlToken, {
            username: email,
            password: password
        }).then(async (response) => {
            const token = response.data;
            await StoreHelper.save('token', token);
            tokenVerify();
        }).catch((error: any) => {
            console.log(error);
            throw error;
        });
        setLoading(false);
    }

    const patchUser = async (user: IUser) => {
        const token = await StoreHelper.get('token');
        axios.post(config.apiUrlUpdateUser, {
            _method: 'PATCH',
            name: user.name,
            phone: user.phone,
            email: user.email,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setUser(user);
        }).catch((error: any) => {
            console.log(error);
            throw error;
        });
    }



    return (
        <SafeAreaProvider>
            <AuthContext.Provider value={{ user, setUser, authenticate, loading, patchUser }}>
                {children}
            </AuthContext.Provider >
        </SafeAreaProvider>
    );
}