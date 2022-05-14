import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * @class Header
 * @extends {Component<any, any>}
 * @description This class is used to display the header of the application.
 */
export default class Header extends Component<any> {
    render() {
        return (
            <Text style={styles.header}> {this.props.children} </Text>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: '#051c2f',
        fontWeight: 'bold',
        paddingVertical: 12,
        borderColor: '#051c2f',
        borderWidth: 1,
    },
})

