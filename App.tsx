import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthenticationForm from './screens/AuthenticationForm';
import Header from './components/Header';
import StoreHelper from './expo/StoreHelper';

type MyState = {
  isLoggedIn: boolean,
}

class App extends Component {

  store = new StoreHelper();

  #state: MyState = {
    isLoggedIn: false,
  }


  init() {
    // TODO : Initialize the application.
    console.log('Application is initialized.');
  }

  render() {
    return (
      <View style={styles.container} >
        <Header> Connexion </Header>
        <AuthenticationForm store={this.store} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
