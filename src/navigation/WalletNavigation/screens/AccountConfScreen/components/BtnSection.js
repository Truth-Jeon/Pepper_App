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
import {useNavigation} from '@react-navigation/native';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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

export const BtnSection = ({isVisible, setIsVisible, onPress}) => {
  const navigation = useNavigation();

  const gotestScreen = () => {
    navigation.navigate('QRScannerScreen');
  };

  const renderModalComponent = () => {
    return (
      <>
        <Sv>
          <St h3>{'약관에 동의한다면 \n충전신청을 선택하세요.'}</St>
        </Sv>
        <Sv>
          <St g2 mt={14}>
            {
              '충전 결제/입금 후 48시간 (2영업일) 이내에 충전금액의\n계좌출금 기능은 전자금융범죄 피해 예방을 위해\n제한될 수 있습니다.'
            }
          </St>
        </Sv>
        <Sv mt={30} f={1} mx={10} mb={55}>
          <ButtonL title="확인" onPress={onPress} />
        </Sv>
      </>
    );
  };

  return (
    <S.Container>
      <View>
        <Sv mx={22} mb={22}>
          <ButtonL title="확인" onPress={() => setIsVisible(true)} />
        </Sv>
      </View>
      <ModalSlide
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        renderComponent={renderModalComponent}
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  /* flex: 1; */
`;

S.ImgList = styled(Image)`s
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
