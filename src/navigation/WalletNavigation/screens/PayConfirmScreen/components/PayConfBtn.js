import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {useNavigation} from '@react-navigation/native';

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

export const PayConfBtn = ({
  disabled,
  goBackPayScreen,
  onPressTransaction,
  title,
}) => {
  return (
    <Sv>
      <St></St>
      <Sv row mt={36} mb={16} mx={17}>
        <Sv f={1}>
          <ButtonL fillGray title="취소" onPress={goBackPayScreen} />
        </Sv>
        <Sv w={12} />
        <Sv f={1}>
          <ButtonL title={title} onPress={onPressTransaction} />
        </Sv>
      </Sv>
    </Sv>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

S.ImgList = styled(Image)`s
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;
