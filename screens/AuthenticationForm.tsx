import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import Header from '../components/Header';

export type states = {
    email: string,
    password: string,
}

class AuthenticationForm extends Component {

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state: states = { email: '', password: '' };

    handleChange(name: string, value: string) {
        this.setState({ [name]: value });
    }

    handleSubmit() {
        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.form} >
                <Header> Welcome back ! </Header>
                <Text style={styles.label} >Email</Text>
                <TextInput style={styles.input} value={this.state.email} onChangeText={(text) => this.handleChange('email', text)} />
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

export default AuthenticationForm;