import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';


class Header extends Component<any> {

    render() {
        return (
            <Text style={styles.header}> {this.props.children} </Text>
        );
    }
}

export default Header;

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

