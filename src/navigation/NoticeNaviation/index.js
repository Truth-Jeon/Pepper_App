import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {NoticeMainScreen} from './screens/NoticeMainScreen';

const Stack = createStackNavigator();

export const NoticeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="NoticeMainScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.select({android: false, ios: true}),
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="NoticeMainScreen" component={NoticeMainScreen} />
    </Stack.Navigator>
  );
};
