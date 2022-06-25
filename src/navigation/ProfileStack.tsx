import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import { IconButton, Colors } from 'react-native-paper';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack({ navigation }: any) {

  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
        title: 'Profil',
        headerRight: () => <IconButton
          icon="pencil"
          color={Colors.blue400}
          size={30}
          onPress={() => navigation.navigate('ProfileEditScreen')}
        />
      }} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ title: 'Modifier le Profil' }} />
    </Stack.Navigator>
  );
}