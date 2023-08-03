import {HeaderM} from 'components/Header/HeaderM';
import {St, Sv} from 'components/index';
import {InputPass} from 'components/Input/InputPass';
import {PassCircleList} from 'components/List/PassCircleList';
import {ModalSlide} from 'components/Modal/ModalSlide';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {getRequest, postRequest} from 'apis/common';
import DeviceInfo from 'react-native-device-info';
import {setCreateAccount} from 'store/reducer/accountReducer';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {sha256} from 'react-native-sha256';
import {toastShowBottom, toastShowTop} from 'helper/toastHelper';
import TouchID from 'react-native-touch-id';
import {colors} from 'styles/colors';

const INFO_TEXT1 = ['비밀번호 6자리를 입력해주세요.', '다시 한 번 입력하세요.'];

export const LockPasswordScreen = ({navigation, route}) => {
  const [password, setPassword] = useState([-1, -1, -1, -1, -1, -1]);

  const {is_biometric_authentication, bio_code} = useSelector(
    state => state.appConfig,
  );

  const login = async () => {
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
      navigation.replace('BottomNavigation');
    } catch (e) {
      if (e?.response?.status === 401) {
        console.log('엑세스 토큰 만료');
      }
      clearPassword();
      toastShowTop('error', e.response.data.message);
    }
  };

  const clearPassword = () => {
    setPassword([-1, -1, -1, -1, -1, -1]);
  };

  const checkBio = async () => {
    const optionalConfigObject = {
      title: '로그인',
      imageColor: colors.primary,
      imageErrorColor: colors.red,
      authFailDescription: '생체 인증에 실패하였습니다.',
      cancelText: '취소',
    };
    TouchID.authenticate('', optionalConfigObject)
      .then(successOptions => {
        // Success code
        console.log('successOptions', successOptions, bio_code);
        // login();
        navigation.replace('BottomNavigation');
        toastShowTop('success', '환영합니다.');
      })
      .catch(error => {
        // Failure code
        console.log(error);
        toastShowTop('error', '생체인증에 실패하였습니다.');
      });
  };

  useEffect(() => {
    if (password.filter(e => e === -1).length === 0) {
      login();
    }
  }, [password]);

  useEffect(() => {
    if (is_biometric_authentication == true) {
      checkBio();
    }
  }, [is_biometric_authentication]);

  return (
    <>
      <S.Container>
        <HeaderM hasBack={false} />
        <Sv col jsb act f={1}>
          <Sv col act jct mt={44}>
            <St s1 g0 />
            <St s1 g0 mb={31}>
              {INFO_TEXT1[0]}
            </St>
            <PassCircleList value={password} />
          </Sv>
          <Sv>
            <InputPass password={password} setPassword={setPassword} />
          </Sv>
        </Sv>
      </S.Container>
    </>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  background-color: white;
`;
