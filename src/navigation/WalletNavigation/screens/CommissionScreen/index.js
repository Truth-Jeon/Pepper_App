import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {CommissionHeader} from './components/CommissionHeader';
import {CommissionInput} from './components/CommissionInput';
import {CommissionBtn} from './components/CommissionBtn';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';

export const CommissionScreen = () => {
  return (
    <S.Container>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Sv style={{flex: 1}}>
          <CommissionHeader />
          <CommissionInput />
        </Sv>
        <CommissionBtn />
      </KeyboardAvoidingView>
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
