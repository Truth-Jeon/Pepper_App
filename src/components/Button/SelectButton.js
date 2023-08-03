import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import n from 'helper/normalize';
import styled, {css} from 'styled-components';
import {colors} from 'styles/colors';
// import IcCheckboxOn from 'images/IcCheckboxOn.svg';
import {Sv, St} from 'components/index';

export const SelectButton = ({
  onPress,
  title = '',
  style,
  checked = false,
  source,
}) => {
  return (
    <S.ListContainer
      style={style}
      onPress={() => {
        if (typeof onPress == 'function') onPress();
      }}>
      <Sv aed jed>
        <S.ImageContainer checked={checked}>
          <S.Image source={source}></S.Image>
        </S.ImageContainer>
        {checked && (
          <S.CheckboxWrapper>
            <IcCheckboxOn />
          </S.CheckboxWrapper>
        )}
      </Sv>

      <Sv act>
        <St c1>{title}</St>
      </Sv>
    </S.ListContainer>
  );
};

const S = {};

// ${n()}

const checked = css`
  border: 2px solid ${colors.primary};
`;

S.ListContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  border-radius: ${n(20)}px;
  width: ${n(64)}px;
`;

S.Image = styled(Image)`
  width: ${n(40)}px;
  height: ${n(40)}px;
`;

S.CheckboxWrapper = styled.View`
  position: absolute;
  right: 0;
  bottom: 4px;
`;

S.ImageContainer = styled.View`
  width: ${n(64)}px;
  height: ${n(64)}px;
  border-radius: ${n(100)}px;
  margin-bottom: ${n(4)}px;
  background: ${colors.g6};
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.checked && checked}
`;
