import React, {useState} from 'react';
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
import {ModalSlide} from 'components/Modal/ModalSlide';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';
import {NoticeBtn} from './components/NoticeBtn';
import {NoticeHeader} from './components/NoticeHeader';

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';

export const NoticeScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <S.Container>
      <Sv style={{flex: 1}}>
        <NoticeHeader />
      </Sv>
      <NoticeBtn isVisible={isVisible} setIsVisible={setIsVisible} />
      {isVisible && <S.ModalOverlay />}
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
