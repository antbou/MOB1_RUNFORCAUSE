import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import config from '../config/config.json';
import axios from 'axios';
import StoreHelper from '../expo/StoreHelper';


interface IContextInterface {
    user: {
        token: any;
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
    token: string,
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
        isLoggedIn: false,
        token: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const token = await StoreHelper.get('token');
        await axios.get(
            config.server + '/api/rfc/me?', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async (response: { data: any; }) => {
            setUser({
                email: response.data.email,
                name: response.data.name,
                picture: response.data.picture,
                phone: response.data.phone,
                isLoggedIn: true,
                token: token ?? '',
            });
        }).catch((error: any) => {
            console.log(error);
            setUser({
                email: '',
                name: '',
                picture: '',
                phone: '',
                isLoggedIn: false,
                token: '',
            });
        });
        setLoading(false);
    }

    const authenticate = async (email: string, password: string) => {
        await axios.post(config.server + '/api/rfc/mytoken?', {
            username: email,
            password: password
        }).then(async (response) => {
            const token = response.data;
            await StoreHelper.save('token', token);
            loadUser();
        }).catch((error: any) => {
            console.log(error + 'bib');
            throw error;
        });
        setLoading(false);
    }

    const patchUser = async (user: IUser) => {
        const token = await StoreHelper.get('token');
        axios.post(config.server + '/api/rfc/profile?', {
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