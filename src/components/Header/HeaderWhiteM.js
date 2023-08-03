import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import IcBackWhite from 'images/svg/ic-back-white.svg';
import IcMoreWhite from 'images/svg/ic-more-white.svg';
import IcHeart from 'images/svg/ic-heart.svg';
import IcHeartOn from 'images/svg/ic-heart-on.svg';

import {useNavigation} from '@react-navigation/native';

export const HeaderWhiteM = ({
  hasBack = true,
  hasButton = false,
  customBackPress = false,
  right,
  light,
  onPressHeart,
  isInterested,
  onPressMore,
  hasRight = true,
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
        <Sv row act>
          {hasBack && (
            <TouchableOpacity onPress={goBack}>
              <IcBackWhite style={{color: light ? 'white' : colors.g3}} />
            </TouchableOpacity>
          )}
        </Sv>
        <Sv></Sv>
        {/* {hasRight && (
          <Sv row act mr={12}>
            <Sv as={TouchableOpacity} onPress={onPressHeart}>
              {isInterested ? <IcHeartOn /> : <IcHeart />}
            </Sv>
            <Sv as={TouchableOpacity} onPress={onPressMore}>
              <IcMoreWhite />
            </Sv>
          </Sv>
        )} */}
        {hasRight && (
          <Sv row act mr={12}>
            <Sv as={TouchableOpacity} onPress={onPressMore}>
              <IcMoreWhite />
            </Sv>
          </Sv>
        )}
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
