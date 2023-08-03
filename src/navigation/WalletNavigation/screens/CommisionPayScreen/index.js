import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Button,
  Pressable,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';
import {ComPayHeader} from './components/ComPayHeader';
import {ComPayInput} from './components/ComPayInput';
import {ComPayBtn} from './components/ComPayBtn';
//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';

export const CommisionPayScreen = () => {
  return (
    <S.Container>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Sv style={{flex: 1}}>
          <ComPayHeader />
          <ComPayInput />
        </Sv>
        <ComPayBtn />
      </KeyboardAvoidingView>
      <S.NoticeBtn>
        <St g3 mt={12}>
          계좌입금 이용안내
        </St>
      </S.NoticeBtn>
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
S.NoticeBtn = styled(Pressable)`
  align-items: center;
  justify-content: center;
`;
