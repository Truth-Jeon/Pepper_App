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

export const TableList = ({
  onPress,
  icon,
  title = '',
  body = '',
  isTouchable = false,
}) => {
  return (
    <>
      <Sv row act py={4}>
        <Sv w={72}>
          <St b2 g0>
            {title}
          </St>
        </Sv>
        {isTouchable ? (
          <Sv
            style={{flex: 1}}
            as={TouchableOpacity}
            onPress={onPress && onPress}
            p={10}
            mr={60}>
            <St b2 primary ml={8}>
              {body}
            </St>
          </Sv>
        ) : (
          <Sv style={{flex: 1}} p={10}>
            <St b2 g3 ml={8}>
              {body}
            </St>
          </Sv>
        )}
      </Sv>
      <Sv h={1} bg={colors.g6} />
    </>
  );
};

const S = {};
