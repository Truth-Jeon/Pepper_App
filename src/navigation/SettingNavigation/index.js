import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {SettingScreen} from './screens/SettingScreen';
import {NoticeListScreen} from './screens/NoticeListScreen/index';
import {NoticeDetailScreen} from './screens/NoticeDetailScreen/index';
import {VersionInfoScreen} from './screens/VersionInfoScreen/VersionInfoScreen';
import {TermDetailScreen} from './screens/TermDetailScreen/index';
import {PasswordChangeScreen} from './screens/PasswordChangeScreen/index';
import {AccountBackupScreen} from './screens/AccountBackupScreen/index';
import {AccountUtilScreen} from './screens/AccountUtilScreen/index';
import {PromotionScreen} from './screens/PromotionScreen/index';
import {AccountRestoreScreen} from './screens/AccountRestoreScreen/index';
import {LoginPasswordScreen} from '../LoginNavigation/screens/LoginPasswordScreen/index';

const Stack = createStackNavigator();

export const SettingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.select({android: false, ios: true}),
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="NoticeListScreen" component={NoticeListScreen} />
      <Stack.Screen name="NoticeDetailScreen" component={NoticeDetailScreen} />
      <Stack.Screen name="VersionInfoScreen" component={VersionInfoScreen} />
      <Stack.Screen name="TermDetailScreen" component={TermDetailScreen} />
      <Stack.Screen
        name="PasswordChangeScreen"
        component={PasswordChangeScreen}
      />
      <Stack.Screen
        name="AccountBackupScreen"
        component={AccountBackupScreen}
      />
      <Stack.Screen
        name="LoginPasswordScreen"
        component={LoginPasswordScreen}
      />
      <Stack.Screen
        name="AccountRestoreScreen"
        component={AccountRestoreScreen}
      />
      <Stack.Screen name="AccountUtilScreen" component={AccountUtilScreen} />
      <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
    </Stack.Navigator>
  );
};
