import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import IcArrowDown from 'images/IcArrowDown.svg';
import {useNavigation} from '@react-navigation/native';

export const BadgeS = ({
  onPress,
  title = '',
  bg = colors.primary,
  hasArrow = false,
  isTouchable,
}) => {
  const navigation = useNavigation();
  return (
    <Sv
      as={isTouchable ? TouchableOpacity : View}
      onPress={onPress && onPress}
      row>
      <Sv py={2} px={4} bg={bg} br={4} row>
        <St c3 white bold>
          {title}
        </St>
        {hasArrow ? (
          <Sv mr={-6}>
            <IcArrowDown />
          </Sv>
        ) : null}
      </Sv>
    </Sv>
  );
};

const S = {};
