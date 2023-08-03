import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
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

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';

export const CommissionHeader = () => {
  const [possiblePrice, setpossiblePrice] = useState(0);

  return (
    <Sv>
      <HeaderL title={`송금할 금액을 입력해주세요`} />
      <St g3 mx={22}>
        {'출금가능금액'} {possiblePrice} 원
      </St>
    </Sv>
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
