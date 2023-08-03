import {Sv, St, BadgeS} from 'components';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export const CheckboxList = ({onPress, style, title = ''}) => {
  return (
    <Container onPress={onPress && onPress} style={style}>
      <Sv w={`100%`} row jsb act>
        <Sv row act>
          <CheckBox
            boxType="square"
            onFillColor={colors.primary}
            onCheckColor="white"
            onTintColor={colors.primary}
            style={{height: 20, width: 20}}
          />
          <St c2 g2 ml={12}>
            {title}
          </St>
        </Sv>
        <St s4 primary>
          내용보기
        </St>
      </Sv>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 9px 0;
  align-items: center;
`;

const S = {};
