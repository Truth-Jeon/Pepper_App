import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import n from 'helper/normalize';
import styled, {css} from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv, ButtonL} from 'components/index';
import IcBack from 'images/IcBack.svg';
import {useNavigation} from '@react-navigation/native';

export const Banner = ({onPress, source}) => {
  const navigation = useNavigation();
  return (
    <S.Container onPress={onPress && onPress} platform={Platform.OS}>
      <S.Image source={source} />
    </S.Container>
  );
};

const S = {};

const iosShadow = css`
  shadow-color: ${colors.g5};
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  shadow-offset: 0px 5px;

  elevation: 5;
`;

const androidShadow = css`
  shadow-color: ${colors.g4};
  elevation: 15;
`;

S.Container = styled(TouchableOpacity)`
  border-radius: ${n(8)}px;
  margin: 0 ${n(16)}px;
  width: ${n(343)}px;
  ${props => (props.platform == 'ios' ? iosShadow : androidShadow)}
`;

S.Image = styled.Image`
  resize-mode: contain;
  width: 100%;
  height: ${n(120)}px;
`;
