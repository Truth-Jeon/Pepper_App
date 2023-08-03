import {getRequest, postRequest} from 'apis/common';
import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, Image, Platform, ScrollView} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

//components
import {Sv} from 'components/index';
import {CreateAccountGuide} from './components/CreateAccountGuide';
import {HistorySection} from './components/HistorySection';
import {AccountSection} from './components/AccountSection';

import {NoticeModal} from './components/NoticeModal';
import {MarketLogSection} from './components/MarketLogSection';
import {TransactionLogSection} from './components/TransactionLogSection';

import messaging from '@react-native-firebase/messaging';
import {checkNotifications} from 'react-native-permissions';

moment.locale('ko');

export const HomeScreen = ({navigation}) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const {isAuth} = useSelector(state => state.account);
  const [chargeStatusModalData, setChargeStatusModalData] = useState();

  const [isRefresh, setIsRefresh] = useState(false);

  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);

  const getChargeStatus = async () => {
    try {
      const result = await getRequest('/v1/account/charge-status/');
      setChargeStatusModalData({
        point: result.point,
        expire_date: result.expire_date,
      });
    } catch (e) {
      setChargeStatusModalData();
    }
  };

  const fcmTokenRegister = async fcmToken => {
    const device_id = await DeviceInfo.getUniqueId();
    console.log('device_id :', device_id);
    try {
      await postRequest('/fcm/devices/', {
        registration_id: fcmToken,
        type: Platform.OS,
        device_id,
      });
    } catch (e) {
      console.log('checkPermission error', e.response.data);
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcm_token = await messaging().getToken();
      fcmTokenRegister(fcm_token);
    }
  };

  const checkPermission = () => {
    console.log('call checkPermission');
    checkNotifications().then(status => {
      if (status.status === 'denied') {
        requestUserPermission();
      } else if (status.status === 'granted' || status.status === 'limited') {
        requestUserPermission();
      }
    });
  };

  useEffect(() => {
    if (isAuth !== null) {
      checkPermission();
    }
  }, [isAuth]);

  useEffect(() => {
    getChargeStatus();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getChargeStatus();
    }, []),
  );

  useEffect(() => {
    if (isRefresh) {
      setIsRefresh(false);
      getChargeStatus();
    }
  }, [isRefresh]);

  return (
    <S.Container>
      <Sv pt={20} px={22} pb={8}>
        <LogoPepper />
      </Sv>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isAuth ? (
          <>
            {/* 계좌를 생성한 유저의 화면 */}
            <AccountSection isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
            <HistorySection
              getChargeStatus={getChargeStatus}
              setIsOverlay={setIsOverlay}
              chargeStatusModalData={chargeStatusModalData}
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
            />
            <MarketLogSection
              getChargeStatus={getChargeStatus}
              setIsOverlay={setIsOverlay}
              chargeStatusModalData={chargeStatusModalData}
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
            />
            <TransactionLogSection
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
            />
          </>
        ) : (
          <>
            {/* 계좌를 하지 않은 유저의 화면 */}
            <CreateAccountGuide />
          </>
        )}
        <Sv h={20} />
      </ScrollView>
      <NoticeModal
        isVisible={isNoticeModalVisible}
        setIsVisible={setIsNoticeModalVisible}
      />
      {isOverlay && <S.ModalOverlay />}
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: #f2f3f5;
  flex: 1;
  /* margin: 0px ${n(20)}px; */
`;

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
