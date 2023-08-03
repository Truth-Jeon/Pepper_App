import {postRequest} from 'apis/common';
import {HeaderM} from 'components/Header/HeaderM';
import {St, Sv} from 'components/index';
import {InputPass} from 'components/Input/InputPass';
import {PassCircleList} from 'components/List/PassCircleList';
import {ModalSlide} from 'components/Modal/ModalSlide';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {toastShowTop} from 'helper/toastHelper';

const INFO_TEXT1 = [
  '현재 비밀번호 6자리를 입력하세요.',
  '새롭게 설정할 비밀번호',
  '다시 한 번 입력하세요.',
];
const INFO_TEXT2 = [' ', '숫자 6자리를 입력하세요.', ' '];

export const PasswordChangeScreen = ({navigation}) => {
  const [userPassword, setUserPassword] = useState([-1, -1, -1, -1, -1, -1]); // 기존 패스워드 저장 변수

  const [password, setPassword] = useState([-1, -1, -1, -1, -1, -1]);
  const [beforePassword, setBeforePassword] = useState([
    -1, -1, -1, -1, -1, -1,
  ]);
  const [status, setStatus] = useState(0);

  const onPassInputComplete = () => {
    if (beforePassword.join('') === password.join('')) {
      Alert.alert('비밀번호 설정', '비밀번호 설정을 완료했습니다.', [
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } else {
      Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.', [
        {
          text: '확인',
          onPress: () => {
            setPassword([-1, -1, -1, -1, -1, -1]);
            setStatus(0);
          },
        },
      ]);
    }
  };

  const passwordCheck = async () => {
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

    console.log(parms);

    try {
      await postRequest('/v1/account/password-validation/', parms);
      setUserPassword([
        password[0],
        password[1],
        password[2],
        password[3],
        password[4],
        password[5],
      ]);
      setPassword([-1, -1, -1, -1, -1, -1]);
      setStatus(1);
    } catch (e) {
      // 엑세스 토큰 만료일경우
      if (e?.response?.status === 401) {
        console.log('엑세스 토큰 만료');
      }
      setPassword([-1, -1, -1, -1, -1, -1]);
      toastShowTop('error', e.response.data.message);
    }
  };

  const changePasswordCheck = async () => {
    const current_time = Math.round(new Date().getTime() / 1000);

    const parms = {
      password_01: userPassword[0],
      password_02: userPassword[1],
      password_03: userPassword[2],
      password_04: userPassword[3],
      password_05: userPassword[4],
      password_06: userPassword[5],
      new_password_01: password[0],
      new_password_02: password[1],
      new_password_03: password[2],
      new_password_04: password[3],
      new_password_05: password[4],
      new_password_06: password[5],
      time: current_time,
    };

    try {
      await postRequest('/v1/account/change-password/', parms);
      toastShowTop('success', '성공적으로 비밀번호가 변경되었습니다.');
      navigation.replace('BottomNavigation');
    } catch (e) {
      setPassword([-1, -1, -1, -1, -1, -1]);
      toastShowTop('error', e.response.data.message);
    }
  };

  useEffect(() => {
    if (password.filter(e => e === -1).length === 0) {
      if (status === 0) {
        passwordCheck();
      } else if (status === 1) {
        setBeforePassword(password);
        setPassword([-1, -1, -1, -1, -1, -1]);
        setStatus(2);
      } else {
        if (beforePassword.join('') === password.join('')) {
          changePasswordCheck();
        } else {
          Alert.alert('비밀번호 불일치', '이전 비밀번호와 일치하지 않습니다.', [
            {
              text: '확인',
              onPress: () => {
                setPassword([-1, -1, -1, -1, -1, -1]);
              },
            },
          ]);
        }
      }
    }
  }, [password, status]);

  return (
    <>
      <S.Container>
        <HeaderM />
        <Sv col jsb act f={1}>
          <Sv col act jct mt={44}>
            <St s1 g0>
              {INFO_TEXT1[status]}
            </St>
            <St s1 g0 mb={16}>
              {INFO_TEXT2[status]}
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
