/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, Image, Pressable, Keyboard} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';

//components
import {Sv} from 'components/index';
import {RechargeHeader} from './components/components/RechargeHeader';
import {RechargeBtn} from './components/components/RechargeBtn';

//images

export const RechargeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chargePoint, setChargePoint] = useState(0);

  return (
    <S.Container>
      <Pressable style={{flex: 1}} onPressIn={Keyboard.dismiss}>
        <Sv style={{flex: 1}}>
          <RechargeHeader
            chargePoint={chargePoint}
            setChargePoint={setChargePoint}
          />
        </Sv>
        <RechargeBtn
          chargePoint={chargePoint}
          isVisible={isVisible}
          is
          setIsVisible={setIsVisible}
        />
        {isVisible && <S.ModalOverlay />}
      </Pressable>
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
