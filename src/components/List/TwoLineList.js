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
import n from 'helper/normalize';

export const TwoLineList = ({onPress, icon, title = '', date = ''}) => {
  return (
    <Sv as={TouchableOpacity} onPress={onPress && onPress}>
      <Sv col py={12} onPress={onPress}>
        {icon && <Sv mr={4}>{icon}</Sv>}
        <St s2 g0>
          {title}
        </St>
        <St c2 g3 mt={4}>
          {date}
        </St>
      </Sv>
      {/* <Sv bg={colors.g6} h={1} /> */}
    </Sv>
  );
};

const S = {};
