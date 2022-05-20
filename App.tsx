import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import Header from './components/Header';
import SettingsScreen from './screens/SettingsScreen';
import StoreHelper from './expo/StoreHelper';
import HomeScreen from "./screens/HomeScreen";
import UserContext from "./context/UserContext";

type MyState = {
  user: {
    username: string,
    isLoggedIn: boolean,
  }
}

class App extends Component {

  store = new StoreHelper();
  Tab = createBottomTabNavigator();
  Stack = createNativeStackNavigator();
  // Navigation = useNavigation();

  state: MyState = {
    user: {
      username: '',
      isLoggedIn: false
    },
  }


  init() {
    // TODO : Initialize the application.
    console.log('Application is initialized.');
  }

  /**
     * @description: This method is called when the user puts data in texts fields
     * @param name 
     * @param value 
     */
  handleChange(name: string, value: string) {
    this.setState({ [name]: value });
  }



  // authContext = React.useMemo(
  //   () => ({
  //     signIn: async (data) => {
  //       // In a production app, we need to send some data (usually username, password) to server and get a token
  //       // We will also need to handle errors if sign in failed
  //       // After getting token, we need to persist the token using `SecureStore`
  //       // In the example, we'll use a dummy token

  //       // this.dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
  //     },
  //   }),
  //   []
  // )


  render() {
    return (
      <UserContext.Provider value={this.state}>
        <NavigationContainer>
          {this.state.user.isLoggedIn ? (
            <this.Tab.Navigator>
              <this.Tab.Screen name="Home" component={HomeScreen} />
              <this.Tab.Screen name="Settings" component={SettingsScreen} />
            </this.Tab.Navigator>
          ) : (
            <this.Stack.Navigator>
              <this.Stack.Screen name="SignIn" component={SignInScreen} initialParams={{ store: this.store }} options={{ title: 'Se connecter' }} />
            </this.Stack.Navigator>
          )}
        </NavigationContainer>
      </UserContext.Provider>
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
