import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';

export default class ProfileScreen extends Component {
    static contextType = AuthContext;
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                            }}
                            size={80}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Title style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 5,
                            }]}>John Doe</Title>
                            <Caption style={styles.caption}>@j_doe</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>+91-900000009</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>{this.context.user.email}</Text>
                    </View>
                </View>
                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.menuItem}>
                            <Icon name="cog-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Settings</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#EFEFEF',
        borderTopWidth: 1,
        borderBottomColor: '#EFEFEF',
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