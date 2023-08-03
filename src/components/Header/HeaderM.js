import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import IcBack from 'images/IcBack.svg';

import {useNavigation} from '@react-navigation/native';

export const HeaderM = ({
  hasBack = true,
  title = '',
  hasButton = false,
  customBackPress = false,
  right,
  light,
  hasImage,
  imgSrc,
}) => {
  const goBack = () => {
    if (customBackPress) {
      customBackPress();
    } else {
      navigation.goBack();
    }
  };
  const navigation = useNavigation();
  return (
    <>
      <S.HeaderWrapper>
        <Sv row act h={44} style={{minWidth: 44}}>
          {hasBack && (
            <TouchableOpacity onPress={goBack}>
              <IcBack style={{color: light ? 'white' : colors.g3}} />
            </TouchableOpacity>
          )}
        </Sv>
        <Sv row act>
          {hasImage && (
            <Sv mr={8}>
              <S.Image source={imgSrc} />
            </Sv>
          )}
          <St s2>{title}</St>
        </Sv>
        <Sv row act style={{minWidth: 44}}>
          {right}
        </Sv>
      </S.HeaderWrapper>
      {/* <Sv h={1} bg={colors.g6} /> */}
    </>
  );
};

const S = {};

S.HeaderWrapper = styled.View`
  z-index: 20;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

S.ButtonWrapper = styled(TouchableOpacity)`
  /* padding: ${n(12)}px ${n(20)}px; */
`;

S.ProgressWrapper = styled.View``;

S.Image = styled.Image`
  width: ${n(20)}px;
  height: ${n(20)}px;
  border-radius: 100px;
  background-color: ${colors.g6};
`;
