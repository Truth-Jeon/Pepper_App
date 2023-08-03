import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {LoginNavigation} from 'navigation/LoginNavigation/index';
import {BottomNavigation} from 'navigation/BottomNavigation/index';

import {LockPasswordScreen} from '../LoginNavigation/screens/LockPasswordScreen/index';
import {useSelector} from 'react-redux';
import SplashScreen from 'navigation/LoginNavigation/screens/SplashScreen/index';

const Stack = createStackNavigator();

export const RootNavigation = () => {
  const {is_app_lock} = useSelector(state => state.appConfig);
  const {isAuth} = useSelector(state => state.account);
  return (
    <Stack.Navigator
      initialRouteName={
        'SplashScreen'
        // is_app_lock && isAuth ? 'LockPasswordScreen' : 'BottomNavigation'
      }
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS === 'ios' ? true : false,
        // stackPresentation: 'modal', // 이거 넣으면 버그생김!!!!
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LockPasswordScreen" component={LockPasswordScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="LoginNavigation" component={LoginNavigation} />
    </Stack.Navigator>
  );
};
