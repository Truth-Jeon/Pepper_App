import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getRequest, postRequest} from 'apis/common';
import {toastShowBottom} from 'helper/toastHelper';
import {useNavigation, StackActions} from '@react-navigation/native';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';
import {HeadSection} from './components/HeadSection';
import {InputAccount} from './components/InputAccount';
import {BtnSection} from './components/BtnSection';

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';

export const AccountConfScreen = ({route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const chargePoint = route.params.chargePoint;
  const navigation = useNavigation();

  const onPressCharge = async () => {
    try {
      const result = await postRequest('/v1/account/charge/', {
        point: chargePoint,
      });

      toastShowBottom('success', '충전 신청이 완료 되었습니다.');
      navigation.dispatch(StackActions.popToTop());
    } catch (e) {
      toastShowBottom('error', e.response.data.message);
      setIsVisible(false);
      console.log(e.response.data);
    }
  };

  return (
    <S.Container>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Sv style={{flex: 1}}>
          <HeadSection />
          <InputAccount chargePoint={chargePoint} />
        </Sv>
        <Sv>
          <BtnSection
            onPress={onPressCharge}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </Sv>
        {isVisible && <S.ModalOverlay />}
      </KeyboardAvoidingView>
      {/* <Sv>
        <St g3 center>
          {'계좌입금 이용안내'}
        </St>
      </Sv> */}
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
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
