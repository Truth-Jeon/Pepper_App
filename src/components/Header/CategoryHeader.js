import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import LogoMain from 'images/LogoMain.svg';
import IcMy from 'images/IcMy.svg';

export const CategoryHeader = ({title = '', icon}) => {
  return (
    <S.HeaderWrapper>
      <Sv row jsb act f={1} pt={24} px={20}>
        <St h2 bold>
          {title}
        </St>

        <Sv>{icon}</Sv>
      </Sv>
    </S.HeaderWrapper>
  );
};

const S = {};

S.HeaderWrapper = styled.View`
  min-height: 90px;
`;

S.ProgressWrapper = styled.View``;
