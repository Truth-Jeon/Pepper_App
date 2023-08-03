import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from 'styles/colors';
import {HomeScreen} from 'navigation/WalletNavigation/screens/HomeScreen';
import {DealScreen} from 'navigation/DealNavigation/screens/DealScreen';
import {SettingScreen} from 'navigation/SettingNavigation/screens/SettingScreen';
import n from 'helper/normalize';
import {WalletNavigation} from 'navigation/WalletNavigation/index';
import {DealNavigation} from 'navigation/DealNavigation/index';
import {SettingNavigation} from 'navigation/SettingNavigation/index';
import {NoticeNavigation} from 'navigation/NoticeNaviation/index';
import IcHome from 'images/svg/ic-navi-home.svg';
import IcMarket from 'images/svg/ic-navi-market.svg';
import IcSetting from 'images/svg/ic-navi-setting.svg';
import IcWallet from 'images/svg/ic-navi-wallet.svg';
import IcNotice from 'images/svg/ic-navi-notice.svg';

const Tab = createBottomTabNavigator();

const mainRoutes = [
  // {
  //   name: '홈',
  //   component: DealNavigation,
  //   options: {
  //     tabBarIcon: ({focused}) => (
  //       <IcHome color={focused ? colors.primary : colors.g5} />
  //     ),
  //   },
  // },
  {
    name: '지갑',
    component: WalletNavigation,
    options: {
      tabBarIcon: ({focused}) => (
        <IcWallet color={focused ? colors.primary : colors.g5} />
      ),
    },
  },
  {
    name: '알림',
    component: NoticeNavigation,
    options: {
      tabBarIcon: ({focused}) => (
        <IcNotice color={focused ? colors.primary : colors.g5} />
      ),
    },
  },
  {
    name: '설정',
    component: SettingNavigation,
    options: {
      tabBarIcon: ({focused}) => (
        <IcSetting color={focused ? colors.primary : colors.g5} />
      ),
    },
  },
];

const isTabBarVisible = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
  return ['HomeScreen', 'DealScreen', 'SettingScreen'].includes(routeName);
};

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {display: isTabBarVisible(route) ? 'flex' : 'none'},
        headerShown: false,
        lazy: false,
      })}
      // screenOptions={{tabBarVisible: true}}
      tabBarOptions={{
        activeTintColor: colors.primary,
        style: {
          backgroundColor: '#FFF',
          borderTopLeftRadius: n(20),
          borderTopRightRadius: n(20),
          shadowColor: 'black',
          shadowRadius: 10,
          shadowOpacity: 0.08,
          position: 'absolute',
        },
        showLabel: false,
        labelStyle: {},
        tabBarOnPress: () => {},
      }}>
      {mainRoutes.map(({name, component, options}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Tab.Navigator>
  );
};
