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
  TouchableWithoutFeedback,
} from 'react-native';
import {Switch} from 'react-native-paper';
import n from 'helper/normalize';
import IcDrag from 'images/IcDrag.svg';
import IcRadioButton from 'images/IcRadioButton.svg';
import IcRadioButtonOn from 'images/IcRadioButtonOn.svg';
import IcStar16 from 'images/IcStar16.svg';
import IcStarYellow16 from 'images/IcStarYellow16.svg';

export const RadioSingleLineList = ({
  onPress,
  onLongPress,
  selected = false,
  즐겨찾기상태,
  handle즐겨찾기,
  title = '',
  hasDrag,
  onPressDrag,
}) => {
  return (
    <Sv
      as={TouchableOpacity}
      onLongPress={onLongPress && onLongPress}
      onPress={onPress && onPress}>
      <Sv py={16} row jsb act onPress={onPress}>
        <Sv row act>
          <Sv mr={4}>{selected ? <IcRadioButtonOn /> : <IcRadioButton />}</Sv>
          <St b2 g0>
            {title}
          </St>
        </Sv>
        <Sv row act>
          <Sv mr={8}>
            {즐겨찾기상태 ? (
              <TouchableOpacity onPress={handle즐겨찾기}>
                <IcStarYellow16 />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handle즐겨찾기}>
                <IcStar16 />
              </TouchableOpacity>
            )}
          </Sv>
          {hasDrag && (
            <TouchableOpacity onPressIn={onPressDrag && onPressDrag}>
              <IcDrag />
            </TouchableOpacity>
          )}
        </Sv>
      </Sv>
      <Sv bg={colors.g6} h={1} />
    </Sv>
  );
};

const S = {};

S.Switch = styled(Switch)``;
