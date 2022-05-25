import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Button } from 'react-native';
import StoreHelper from '../expo/StoreHelper';
import Header from '../components/Header';
import { AuthContext } from '../navigation/AuthProvider';


interface IMyProps {
    store: StoreHelper,
    navigation: any,
    route: any,
}

interface IStates {
    username: string,
    password: string,
    error: string
}

/**
 * @class AuthenticationForm
 * @extends {Component<any, states>}
 * @description This class is used to authenticate the user.
 */
export default class SignInScreen extends Component<IMyProps> {
    static contextType = AuthContext;
    state: IStates = { username: '', password: '', error: '' };

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * @description: This method is called when the user puts data in texts fields
     * @param name 
     * @param value 
     */
    handleChange(name: string, value: string) {
        this.setState({ [name]: value });
    }

    /**
     * @description: This function is called when the user clicks the submit button.
     */
    async handleSubmit() {
        // Delete error message
        this.handleChange('error', '');

        try {
            await this.context.login(this.state.username, this.state.password);
        } catch (error) {
            this.handleChange('error', 'Email ou mot de passe incorrect');
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Header> Connexion </Header>
                <View style={styles.form} >
                    <Text  >Nom d'utilisateur</Text>
                    <TextInput style={styles.input} value={this.state.username} onChangeText={(text) => this.handleChange('username', text)} keyboardType={'email-address'} placeholder="Email" />
                    <Text>Mot de passe</Text>
                    <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={(text) => this.handleChange('password', text)} placeholder="Mot de passe" ></TextInput>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <Pressable onPress={this.handleSubmit} style={styles.button}>
                        <Text style={styles.text}>Se connecter</Text>
                    </Pressable>
                </View>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#051c2f',
    },
    form: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: '#3F5EFB',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 80,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});