import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {DealScreen} from './screens/DealScreen';
import {DealCreateScreen} from './screens/DealCreateScreen/index';
import {DealDetailScreen} from './screens/DealDetailScreen/index';
import {DealChatScreen} from './screens/DealChatScreen/index';
import DealInputShipScreen from './screens/DealInputShipScreen/index';
import {PayConfirmScreen} from 'navigation/WalletNavigation/screens/PayConfirmScreen/index';
import {PayCompleteScreen} from 'navigation/WalletNavigation/screens/PayCompleteScreen/index';

const Stack = createStackNavigator();

export const DealNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DealScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.select({android: false, ios: true}),
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="DealScreen" component={DealScreen} />
      <Stack.Screen name="DealCreateScreen" component={DealCreateScreen} />
      <Stack.Screen name="DealDetailScreen" component={DealDetailScreen} />
      <Stack.Screen name="DealChatScreen" component={DealChatScreen} />
      <Stack.Screen
        name="DealInputShipScreen"
        component={DealInputShipScreen}
      />
      <Stack.Screen name="PayConfirmScreen" component={PayConfirmScreen} />
      <Stack.Screen name="PayCompleteScreen" component={PayCompleteScreen} />
    </Stack.Navigator>
  );
};
