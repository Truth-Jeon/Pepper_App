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

export const TableListSmall = ({onPress, icon, title = '', body = ''}) => {
  return (
    <Sv as={TouchableOpacity} onPress={onPress && onPress} row act py={4}>
      <Sv w={44}>
        <St c2 primary>
          {title}
        </St>
      </Sv>
      <St c2 g0 ml={8}>
        {body}
      </St>
    </Sv>
  );
};

const S = {};
