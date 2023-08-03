import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import n from 'helper/normalize';
import styled, {css} from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import {useNavigation} from '@react-navigation/native';

export const FAB = ({onPress, title = '', icon}) => {
  const navigation = useNavigation();
  return (
    <Sv row>
      <S.Container onPress={onPress && onPress} row platform={Platform.OS}>
        <Sv p={14} bg={colors.primary} br={99} row>
          {icon}
        </Sv>
      </S.Container>
    </Sv>
  );
};

const S = {};

const iosShadow = css`
  shadow-color: ${colors.primary};
  shadow-offset: 5px 5px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

const androidShadow = css`
  shadow-color: ${colors.primary};
  shadow-offset: 5px 5px;
  shadow-opacity: 1;
  shadow-radius: 10px;
  elevation: 15;
`;

S.Container = styled(TouchableOpacity)`
  ${props => (props.platform == 'ios' ? iosShadow : androidShadow)}
`;
