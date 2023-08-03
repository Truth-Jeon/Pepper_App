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
import QRCode from 'react-native-qrcode-svg';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';
import {QRHeader} from './components/QRHeader';
import {QRBtnSection} from './components/QRBtnSection';
import {QRcodeSection} from './components/QRcodeSection';

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';
import {useSelector} from 'react-redux';

export const QRcodeScreen = () => {
  const {quick_address} = useSelector(state => state.account);

  return (
    <S.Container>
      <Sv style={{flex: 1}}>
        <QRHeader />
        <QRcodeSection />
        <Sv mt={100} mx={70}>
          <QRCode
            size={230}
            value={`pepper://wallet/transaction-input/${quick_address}`}
          />
        </Sv>
      </Sv>
      <QRBtnSection />
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
