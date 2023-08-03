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
} from 'components/index';

export const CommissionInput = () => {
  return (
    <Sv mx={22} mt={70}>
      <InputL placeholder="송금할 금액을 입력하시오" numberType />
      <Sv mt={12} row>
        <S.CopyBtn>
          <St>+5만</St>
        </S.CopyBtn>

        <Sv mx={8}>
          <S.CopyBtn>
            <St>+10만</St>
          </S.CopyBtn>
        </Sv>

        <Sv>
          <S.CopyBtn>
            <St>+100만</St>
          </S.CopyBtn>
        </Sv>
      </Sv>
    </Sv>
  );
};

const S = {};

S.CopyBtn = styled(Pressable)`
  background-color: ${colors.g6};
  border-radius: ${n(7)};
  align-items: center;
  justify-content: center;
  color: ${colors.g6};
  padding: 5px;
`;
