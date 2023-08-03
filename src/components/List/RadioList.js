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
import IcStar from 'images/IcStar24.svg';
import IcRadioButton from 'images/IcRadioButton.svg';
import IcRadioButtonOn from 'images/IcRadioButtonOn.svg';

export const RadioList = ({
  onPress,
  icon,
  title = '',
  selected = false,
  bookMarked,
  hasBookMark = true,
}) => {
  return (
    <>
      <Sv row jsb act>
        <Sv
          as={TouchableOpacity}
          onPress={onPress && onPress}
          py={16}
          row
          act
          jsb
          f={1}>
          <Sv row act>
            <Sv mr={4}>{selected ? <IcRadioButtonOn /> : <IcRadioButton />}</Sv>
            <St b2 g0>
              {title}
            </St>
          </Sv>
        </Sv>
        <Sv p={8} as={TouchableOpacity} hidden={hasBookMark}>
          <IcStar width="16" />
        </Sv>
      </Sv>
      <Sv bg={colors.g6} h={1} />
    </>
  );
};

const S = {};
