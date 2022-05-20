import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import config from '../config.json';
import Store from '../expo/StoreHelper';

type states = {
    username: string,
    password: string,
    error: string
}

/**
 * @class AuthenticationForm
 * @extends {Component<any, states>}
 * @description This class is used to authenticate the user.
 */
export default class AuthenticationForm extends Component {

    state: states = { username: '', password: '', error: '' };
    #store: Store;

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.#store = new Store();

        // If the user is already logged in, redirect to the home page.
        if (this.#store.get('token') != null) {
            console.log('User is already logged in.');
            // TODO : Redirect to the home page.
        }
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
    handleSubmit() {
        // Clear the error message.
        this.handleChange('error', '');

        // Request the server to authenticate the user.
        axios.post(config.apiUrl, {
            username: this.state.username,
            password: this.state.password
        }).then((response: { data: any; }) => {
            return this.#store.save('token', response.data);
        }).then(() => {
            // TODO : Redirect to the home page.
            console.log('User is logged in.');
        }).catch((error: any) => {
            this.handleChange('error', 'Email ou mot de passe incorrect');
        });
    }

    render() {
        return (
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
});