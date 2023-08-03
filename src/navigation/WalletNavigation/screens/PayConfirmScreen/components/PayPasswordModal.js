import {InputPass, PassCircleList, St, Sv} from 'components/index';
import {ModalSlide} from 'components/Modal/ModalSlide';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {toastShowBottom, toastShowTop} from 'helper/toastHelper';
import TouchID from 'react-native-touch-id';
import {useNavigation} from '@react-navigation/native';
import {colors} from 'styles/colors';
import {postRequest} from 'apis/common';

export const PayPasswordModal = ({
  isVisible,
  setIsVisible,
  onSucess,
  onFail,
  password,
  setPassword,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const {is_biometric_authentication, bio_code} = useSelector(
    state => state.appConfig,
  );

  const onTypeAllPassword = async () => {
    if (isLoading) return;
    const current_time = Math.round(new Date().getTime() / 1000);

    const parms = {
      password_01: password[0],
      password_02: password[1],
      password_03: password[2],
      password_04: password[3],
      password_05: password[4],
      password_06: password[5],
      time: current_time,
    };

    try {
      const response = await postRequest(
        '/v1/account/password-validation/',
        parms,
      );
      console.log(response);
      // navigation.replace('BottomNavigation');

      await onSucess();
    } catch (e) {
      if (e?.response?.status === 401) {
        console.log('엑세스 토큰 만료');
      }
      clearPassword();
      toastShowTop('error', e.response?.data?.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const clearPassword = () => {
    setPassword([-1, -1, -1, -1, -1, -1]);
  };

  const checkBio = async () => {
    const optionalConfigObject = {
      title: '송금을 위하여 생체인증을 요청합니다.',
      imageColor: colors.primary,
      imageErrorColor: colors.red,
      authFailDescription: '생체 인증에 실패하였습니다.',
      cancelText: '취소',
    };
    TouchID.authenticate('', optionalConfigObject)
      .then(successOptions => {
        // Success code
        console.log('successOptions', successOptions, bio_code);
        onSucess();
        // login();
        // navigation.replace('BottomNavigation');
        // toastShowTop('success', '성공적으로 송금하였습니다.');
      })
      .catch(error => {
        // Failure code
        console.log(error);
        toastShowTop('error', '생체인증에 실패하였습니다.');
      });
  };

  useEffect(() => {
    if (isVisible && is_biometric_authentication) {
      checkBio();
    }
  }, [isVisible, is_biometric_authentication]);

  useEffect(() => {
    if (password.filter(e => e === -1).length === 0) {
      setIsLoading(true);
      onTypeAllPassword();
    }
  }, [password]);
  const renderComponent = () => {
    return (
      <Sv>
        <Sv act jct mt={20}>
          <PassCircleList value={password} />
        </Sv>
        <Sv h={40} />
        <InputPass password={password} setPassword={setPassword} />
      </Sv>
    );
  };
  return (
    <ModalSlide
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      renderComponent={renderComponent}
    />
  );
};
