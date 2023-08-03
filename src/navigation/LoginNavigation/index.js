import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {LoginScreen} from './screens/LoginScreen';
import {InputPasswordScreen} from './screens/InputPasswordScreen/index';
import {LoginPasswordScreen} from './screens/LoginPasswordScreen/index';
import SplashScreen from './screens/SplashScreen/index';

const Stack = createStackNavigator();

export const LoginNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="InputPasswordScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.select({android: false, ios: true}),
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="LoginPasswordScreen"
        component={LoginPasswordScreen}
      />

      <Stack.Screen
        name="InputPasswordScreen"
        component={InputPasswordScreen}
      />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};
