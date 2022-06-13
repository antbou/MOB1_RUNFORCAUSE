import React, { useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { AuthContext } from '../navigation/AuthProvider';

export default function ProfileEditScreen({ navigation }: any) {

    const context = React.useContext(AuthContext);

    const [user, setUser] = React.useState({
        name: context.user.name,
        email: context.user.email,
        phone: context.user.phone,
        picture: context.user.picture,
        isLoggedIn: context.user.isLoggedIn,
    });


    const handleChange = () => {
        context.setUser(user);
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <TextInput label="Name" value={user.name} onChangeText={(text) => setUser({ ...user, name: text })} />
            <TextInput label="Email" value={user.email} onChangeText={(text) => setUser({ ...user, email: text })} />
            <TextInput label="Phone" value={user.phone} onChangeText={(text) => setUser({ ...user, phone: text })} />

            <Pressable onPress={handleChange} style={styles.button}>
                <Text style={styles.text}>Modifier le profil</Text>
            </Pressable>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: 15,
        paddingEnd: 15,
        paddingStart: 15,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    button: {
        backgroundColor: '#FF6347',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fafafa',
        fontSize: 16,
        fontWeight: '600',
    }
});