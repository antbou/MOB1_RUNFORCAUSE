import React from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Button } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../navigation/AuthProvider';


export default function SignInScreen() {
    const context = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');


    const handleSubmit = async () => {
        // Delete error message
        setError('');
        try {
            await context.authenticate(username, password);
        } catch (error: any) {
            if (error.response.status === 401) {
                setError('Identifiants incorrects');
            } else {
                setError('Une erreur est survenue');
            }
        }
    }

    return (
        <View style={styles.container} >
            <Header> Connexion </Header>
            <View style={styles.form} >
                <Text  >Nom d'utilisateur</Text>
                <TextInput style={styles.input} value={username} onChangeText={(text) => setUsername(text)} keyboardType={'email-address'} placeholder="Email" />
                <Text>Mot de passe</Text>
                <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={(text) => setPassword(text)} placeholder="Mot de passe" ></TextInput>
                <Text style={styles.error}>{error}</Text>
                <Pressable onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.text}>Se connecter</Text>
                </Pressable>
            </View>
        </View >
    );
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