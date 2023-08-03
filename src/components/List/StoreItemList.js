import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv, ButtonL} from 'components/index';
import IcBack from 'images/IcBack.svg';
import {useNavigation} from '@react-navigation/native';
import IcDiscountBadge from 'images/IcDiscountBadge.svg';

export const StoreItemList = ({
  title = '',
  onPress,
  price = '',
  quantity = '',
  imgSrc,
  discountRate = '',
}) => {
  const navigation = useNavigation();
  return (
    <Sv
      as={TouchableOpacity}
      onPress={onPress && onPress}
      b={`1px solid ${colors.g6}`}
      br={12}
      p={12}
      f={1}>
      <S.Image source={imgSrc} />
      <Sv row jct mb={16}>
        <St s2>{quantity}개</St>
      </Sv>
      <Sv px={16} py={8} bg={colors.secondary} br={8} act>
        <St s4 white>
          ₩ {price}
        </St>
      </Sv>
    </Sv>
  );
};

const S = {};

S.Image = styled.Image`
  height: ${n(100)}px;
  margin-bottom: ${n(10)}px;
  width: 100%;
  resize-mode: contain;
`;
