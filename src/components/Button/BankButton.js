import {St, Sv} from 'components/index';
import n from 'helper/normalize';
import React from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';

export const BankButton = ({title, value, img, onPress}) => {
  return (
    <Sv
      as={TouchableOpacity}
      onPress={onPress}
      row
      act
      pb={20}
      w={Dimensions.get('screen').width / 2 - n(44)}>
      <S.Image source={img} />
      <Sv w={8} />
      <St>{title}</St>
    </Sv>
  );
};

const S = {};
S.Image = styled(Image)`
  width: ${n(30)}px;
  height: ${n(30)}px;
  resize-mode: contain;
  background-color: ${colors.g6};
  border-radius: ${n(20)}px;
`;
