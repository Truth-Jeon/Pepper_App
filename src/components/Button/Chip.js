import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import IcArrowDown from 'images/svg/ic-arrow-down.svg';
import {useNavigation} from '@react-navigation/native';

export const Chip = ({onPress, title = '', hasArrow = true}) => {
  const navigation = useNavigation();
  return (
    <Sv as={TouchableOpacity} onPress={onPress && onPress} row>
      <Sv row act px={12} py={4} b={`1px solid ${colors.g5}`} br={99}>
        <St c1 g3>
          {title}
        </St>
        {hasArrow && (
          <Sv mr={-6}>
            <IcArrowDown />
          </Sv>
        )}
      </Sv>
    </Sv>
  );
};

const S = {};
