import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import SignInScreen from './src/screens/SignInScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StoreHelper from './src/expo/StoreHelper';
import HomeScreen from "./src/screens/HomeScreen";
import UserContext from "./src/context/UserContext";
import config from './src/config/config.json';

interface IMyState {
  user: {
    username: string,
    isLoggedIn: boolean,
  }
}

class App extends Component<any, IMyState> {

  store: StoreHelper;
  Tab = createBottomTabNavigator();
  Stack = createNativeStackNavigator();

  state: IMyState = {
    user: { username: '', isLoggedIn: false },
  }

  constructor(props: any) {
    super(props);
    this.store = new StoreHelper();
    this.setIsLogguedIn = this.setIsLogguedIn.bind(this);
    this.checkIfLoggedIn();
  }

  setIsLogguedIn(isLoggedIn: boolean) {
    this.setState({
      user: {
        username: 'bonjour',
        isLoggedIn: isLoggedIn
      }
    });
  }

  /**
   * @description: This function checks if the user is logged in.
   */
  async checkIfLoggedIn() {
    const token = await this.store.get('token');
    console.log(token);
    axios.get(config.apiUrlCheckToken, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response: { data: any; }) => {
      this.setIsLogguedIn(true);
    }).catch((error: any) => {
      this.setIsLogguedIn(false);
    });
  };

  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user, setIsLogguedIn: this.setIsLogguedIn }}>
        <NavigationContainer>
          {this.state.user.isLoggedIn ? (
            <this.Tab.Navigator>
              <this.Tab.Screen name="Home" component={HomeScreen} />
              <this.Tab.Screen name="Settings" component={SettingsScreen} />
            </this.Tab.Navigator>
          ) : (
            <this.Stack.Navigator screenOptions={{
              gestureEnabled: true
            }}>
              <this.Stack.Screen name="SignIn" component={SignInScreen} initialParams={{ store: this.store }} options={{ title: 'Se connecter' }} />
            </this.Stack.Navigator>
          )}
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}

export default App;
