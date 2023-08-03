import {HeaderM} from 'components/Header/HeaderM';
import {St, Sv} from 'components/index';
import {InputPass} from 'components/Input/InputPass';
import {PassCircleList} from 'components/List/PassCircleList';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import styled from 'styled-components';
import {postRequest} from 'apis/common';
import {toastShowTop} from 'helper/toastHelper';
import {useDispatch} from 'react-redux';
import {setCreateAccountSuccess} from 'store/reducer/accountReducer';
import {useSelector} from 'react-redux';

const INFO_TEXT1 = ['비밀번호 6자리를 입력해주세요.', '다시 한 번 입력하세요.'];

export const LoginPasswordScreen = ({navigation, route}) => {
  const private_key = route.params.private_key;
  const [password, setPassword] = useState([-1, -1, -1, -1, -1, -1]);
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.account);

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
      private_key: private_key,
    };

    try {
      const response = await postRequest('/v1/account/login/', parms);
      console.log(response);
      try {
        dispatch(setCreateAccountSuccess(response));
      } catch (e) {
        console.log(e.response?.data);
        Alert.alert('에러', '에러 [ 버그 수정 필요]', [
          {text: '확인', onPress: () => navigation.replace('BottomNavigation')},
        ]);
      }
    } catch (e) {
      if (e.response.status === 403) {
        Alert.alert('탈퇴 간편 주소', '탈퇴 처리한 간편 주소입니다.', [
          {text: '확인', onPress: () => navigation.replace('BottomNavigation')},
        ]);
      } else {
        clearPassword();
        toastShowTop('error', e.response.data.message);
      }
    }
  };

  const clearPassword = () => {
    setPassword([-1, -1, -1, -1, -1, -1]);
  };

  useEffect(() => {
    if (password.filter(e => e === -1).length === 0) {
      login();
    }
  }, [password]);

  useEffect(() => {
    if (isAuth) {
      navigation.replace('BottomNavigation');
    }
  }, [isAuth]);

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
