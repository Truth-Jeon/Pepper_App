import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
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
  FAB,
  Chip,
} from 'components/index';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {toastShowTop} from 'helper/toastHelper';

export const QRcodeSection = () => {
  const {quick_address} = useSelector(state => state.account);

  return (
    <Sv row px={22}>
      <Sv f={1}>
        <St>{`페퍼간편주소 \n${quick_address}`}</St>
      </Sv>
      <S.CopyBtn
        onPress={() => {
          Clipboard.setString(quick_address);
          toastShowTop('success', '복사가 완료되었습니다.');
        }}>
        <St g3>복사하기</St>
      </S.CopyBtn>
    </Sv>
  );
};

const S = {};

S.CopyBtn = styled(TouchableOpacity)`
  background-color: ${colors.g6};
  border-radius: ${n(7)};
  align-items: center;
  justify-content: center;
  color: ${colors.g6};
  padding: 5px;
`;
