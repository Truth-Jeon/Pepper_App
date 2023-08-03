import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {AccountCreateScreen} from './screens/AccountCreateScreen';
import {QRcodeScreen} from './screens/QRcodeScreen/index';
import {NoticeScreen} from './screens/NoticeScreen/index';
import {PayScreen} from './screens/PayScreen/index';
import {PayConfirmScreen} from './screens/PayConfirmScreen/index';
import {AccountConfScreen} from './screens/AccountConfScreen/index';
import {RechargeScreen} from './screens/RechargeScreen/index';
import {CommissionScreen} from './screens/CommissionScreen/index';
import {QRScannerScreen} from './screens/QRScannerScreen/index';
import {CommisionPayScreen} from './screens/CommisionPayScreen/index';
import {InputPasswordScreen} from '../LoginNavigation/screens/InputPasswordScreen';
import PayInputPriceScreen from './screens/PayInputPriceScreen/index';
import {AccountRestoreScreen} from '../SettingNavigation/screens/AccountRestoreScreen/index';
import {LoginPasswordScreen} from '../LoginNavigation/screens/LoginPasswordScreen/index';
import {PayCompleteScreen} from './screens/PayCompleteScreen/index';
import {DepositHistoryScreen} from './screens/DepositHistoryScreen/index';
import {PassWebViewScreen} from './screens/PassWebViewScreen/index';
import {VerifyScreen} from './screens/VerifyScreen/index';
import {CheckTermList} from 'components/List/CheckTermList';
import {CloseTermDetailScreen} from './screens/CloseTermDetailScreen/index';
import {AccountCreateTermScreen} from './screens/AccountCreateTermScreen/index';

const Stack = createStackNavigator();
export const WalletNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.select({android: false, ios: true}),
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="AccountCreateScreen"
        component={AccountCreateScreen}
      />
      <Stack.Screen name="QRcodeScreen" component={QRcodeScreen} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="PayScreen" component={PayScreen} />
      <Stack.Screen name="PayConfirmScreen" component={PayConfirmScreen} />
      <Stack.Screen name="AccountConfScreen" component={AccountConfScreen} />
      <Stack.Screen name="RechargeScreen" component={RechargeScreen} />
      <Stack.Screen name="CommissionScreen" component={CommissionScreen} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
      <Stack.Screen name="CommisionPayScreen" component={CommisionPayScreen} />
      <Stack.Screen name="PassWebViewScreen" component={PassWebViewScreen} />
      <Stack.Screen
        name="AccountRestoreScreen"
        component={AccountRestoreScreen}
      />
      <Stack.Screen
        name="LoginPasswordScreen"
        component={LoginPasswordScreen}
      />
      <Stack.Screen
        name="InputPasswordScreen"
        component={InputPasswordScreen}
      />
      <Stack.Screen
        name="PayInputPriceScreen"
        component={PayInputPriceScreen}
      />
      <Stack.Screen name="PayCompleteScreen" component={PayCompleteScreen} />
      <Stack.Screen
        name="DepositHistoryScreen"
        component={DepositHistoryScreen}
      />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="CheckTermList" component={CheckTermList} />
      <Stack.Screen
        name="AccountCreateTermScreen"
        component={AccountCreateTermScreen}
      />
      <Stack.Screen
        name="CloseTermDetailScreen"
        component={CloseTermDetailScreen}
      />
    </Stack.Navigator>
  );
};
