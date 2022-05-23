import { Component } from "react";
import { View, StyleSheet, Image } from 'react-native';


export default class SplashScreen extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container} >
                <Image
                    style={styles.image}
                    source={require('../../assets/runforcause.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'center'
    },
});