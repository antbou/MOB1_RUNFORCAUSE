import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Avatar,
    Title,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';
import config from '../config/config.json';
import axios from 'axios';

export default function ProfileScreen() {
    const context = React.useContext(AuthContext);


    const deleteTracking = async () => {
        await axios.delete(config.server + '/api/rfc/location?', {
            headers: {
                Authorization: `Bearer ${context.user.token}`
            }
        }).catch(error => {
            console.log(error);
        });

    }

    const showAlert = () =>
        Alert.alert(
            "Confirmation de suppression",
            "Etes-vous sûr de vouloir supprimer votre historique de navigation ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                { text: "Confirmer", onPress: deleteTracking },
            ],
        );

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'column', marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: config.server + '/storage/pics/' + context.user.picture,
                            }}
                            size={100}
                        />
                        <View>
                            <Title style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 5,
                            }]}>
                                {context.user.name}
                            </Title>
                        </View>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{context.user.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{context.user.phone}</Text>
                    </View>
                </View>
                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={showAlert}>
                        <View style={styles.menuItem}>
                            <Icon name="trash-can-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Supprimer les traces</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        </SafeAreaView>
    );

};

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
});