import {Sv, St, ButtonS, ChatInput} from 'components';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export const Modal = ({onPress, icon, title = ''}) => {
  return (
    <TouchableOpacity onPress={onPress && onPress}>
      <Sv py={10} row act onPress={onPress}>
        {icon && <Sv mr={4}>{icon}</Sv>}
        <St b2 g2>
          {title}
        </St>
      </Sv>
      <Sv bg={colors.g5} h={1} />
    </TouchableOpacity>
  );
};

const S = {};
