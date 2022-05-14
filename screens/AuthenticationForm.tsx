import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import config from '../config.json';

type states = {
    username: string,
    password: string,
}

/**
 * @class AuthenticationForm
 * @extends {Component<any, states>}
 * @description This class is used to authenticate the user.
 */
export default class AuthenticationForm extends Component {

    state: states = { username: '', password: '' };

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
    handleSubmit() {
        console.log(config.apiUrl)
        axios.post(config.apiUrl, {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={styles.form} >
                <Header> Welcome back ! </Header>
                <Text style={styles.label} >Nom d'utilisateur</Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={(text) => this.handleChange('username', text)} />
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={this.state.password} onChangeText={(text) => this.handleChange('password', text)}></TextInput>
                <Button title='OK' onPress={this.handleSubmit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        fontSize: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        marginBottom: 10,
    }
});