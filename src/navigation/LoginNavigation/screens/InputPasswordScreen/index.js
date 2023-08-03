import {HeaderM} from 'components/Header/HeaderM';
import {St, Sv} from 'components/index';
import {InputPass} from 'components/Input/InputPass';
import {PassCircleList} from 'components/List/PassCircleList';
import {ModalSlide} from 'components/Modal/ModalSlide';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {getRequest, postRequest, putFormRequest} from 'apis/common';
import DeviceInfo from 'react-native-device-info';
import {setCreateAccount} from 'store/reducer/accountReducer';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {sha256} from 'react-native-sha256';

const INFO_TEXT1 = ['새롭게 설정할 비밀번호', '다시 한 번 입력하세요.'];
const INFO_TEXT2 = ['숫자 6자리를 입력하세요.', ' '];

export const InputPasswordScreen = ({navigation, route}) => {
  const [password, setPassword] = useState([-1, -1, -1, -1, -1, -1]);
  const [beforePassword, setBeforePassword] = useState([
    -1, -1, -1, -1, -1, -1,
  ]);
  const [status, setStatus] = useState(0);
  const type = route.params?.type || 'lock';
  const {isAuth} = useSelector(state => state.account);
  const {phone, name, birthdate} = useSelector(state => state.phoneVerify);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState();

  const putUser = async () => {
    let formData = new FormData();
    formData.append('phone', phone);
    formData.append('name', name);
    formData.append('birth', birthdate);
    formData.append('is_user_validation', 1);

    console.log('put user formData : ', formData);

    try {
      await putFormRequest('/v1/account/', formData);
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.log('패스 인증 오류', e, e.response);
    } finally {
      // setIsLoading(false);
      // navigation.goBack();
    }
  };

  const createAccount = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const quickAddress = route.params?.quickAddress;
    const device_uuid = await DeviceInfo.getUniqueId();
    const _uuid = uuid.v4();
    const current_time = Math.round(new Date().getTime() / 1000);
    const uuid_sha256 = await sha256(_uuid);

    const parms = {
      private_key: uuid_sha256,
      password_01: beforePassword[0],
      password_02: beforePassword[1],
      password_03: beforePassword[2],
      password_04: beforePassword[3],
      password_05: beforePassword[4],
      password_06: beforePassword[5],
      time: current_time,
      quick_address: quickAddress,
      device_uuid: device_uuid,
    };

    try {
      dispatch(setCreateAccount(parms));
    } catch (e) {
      console.log(e.response?.data);
      Alert.alert('에러', '에러 [ 버그 수정 필요]', [
        {text: '확인', onPress: () => navigation.replace('BottomNavigation')},
      ]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const onPassInputComplete = () => {
    console.log('type : ', type);
    if (beforePassword.join('') === password.join('')) {
      if (type === 'createAccount') {
        createAccount();
      } else {
        Alert.alert('비밀번호 설정', '비밀번호 설정을 완료했습니다.', [
          {text: '확인', onPress: () => navigation.replace('BottomNavigation')},
        ]);
      }
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

  useEffect(() => {
    if (isAuth) {
      putUser();
    }
  }, [isAuth]);

  useEffect(() => {
    if (status === 0) {
      if (password.filter(e => e === -1).length === 0) {
        setBeforePassword(password);
        setPassword([-1, -1, -1, -1, -1, -1]);
        setStatus(1);
      }
    } else {
      if (password.filter(e => e === -1).length === 0) {
        onPassInputComplete();
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
            <St s1 g0 mb={31}>
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
