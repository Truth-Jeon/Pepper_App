import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import styled, {css, ThemeProvider} from 'styled-components';
import {Sv, St} from 'components/index';

export const ButtonM = ({
  title = '',
  disabled = false,
  leftSpace,
  onPress,
  showSpinner = false,
  fill,
  fillGray,
  line,
  pinkLine,
  gray,
  kakao,
  apple,
  red,
  grayLine,
  isNewBadge,
  height = 40,
  px,
}) => {
  return (
    <Sv h={height}>
      <Sv
        as={S.ButtonWrapper}
        px={px}
        onPress={onPress && onPress}
        height={height}
        disabled={disabled}
        fill={fill}
        fillGray={fillGray}
        gray={gray}
        line={line}
        pinkLine={pinkLine}
        kakao={kakao}
        apple={apple}
        red={red}
        grayLine={grayLine}>
        <Sv row act jsb>
          <Sv>{leftSpace && <Sv ml={20}>{leftSpace}</Sv>}</Sv>

          <Sv row>
            <S.Text
              disabled={disabled}
              fill={fill}
              gray={gray}
              fillGray={fillGray}
              line={line}
              pinkLine={pinkLine}
              kakao={kakao}
              apple={apple}
              grayLine={grayLine}>
              {title}
            </S.Text>
          </Sv>
          <Sv>{leftSpace && <Sv w={48} />}</Sv>
        </Sv>
      </Sv>
    </Sv>
  );
};

const S = {};

const fillGray = css`
  background-color: ${colors.g5} !important;
  color: ${colors.g2} !important;
  border: 1px solid transparent !important;
`;

const gray = css`
  background-color: transparent !important;
  color: ${colors.g2} !important;
  border: 1px solid ${colors.g5} !important;
`;

const fill = css`
  background-color: ${colors.primary} !important;
  color: ${colors.white} !important;
  border: 1px solid ${colors.primary} !important;
`;

const line = css`
  background-color: transparent !important;
  color: ${colors.primary} !important;
  border: 1px solid ${colors.primary} !important;
`;

const pinkLine = css`
  background-color: transparent !important;
  color: ${colors.pink} !important;
  border: 1px solid ${colors.pink} !important;
`;

const disabled = css`
  background-color: ${colors.g6} !important;
  color: ${colors.g4} !important;
  border: 1px solid transparent !important;
`;

const kakao = css`
  background-color: #fee500 !important;
  color: ${colors.black} !important;
  border: 1px solid transparent !important;
`;

const apple = css`
  background-color: #fff !important;
  color: ${colors.black} !important;
  border: 1px solid transparent !important;
`;

const red = css`
  background-color: ${disabled ? colors.g2 : colors.red};
  color: ${colors.white} !important;
  border: 1px solid transparent !important;
`;

const grayLine = css`
  border: 1px solid #333333 !important;
  background-color: transparent !important;
  color: #333333 !important;
`;

S.ButtonWrapper = styled(TouchableOpacity)`
  border: 1px solid ${colors.primary};
  background-color: ${colors.primary};
  border-radius: 13px;
  min-height: ${props => props.height || n(40)}px;
  padding: ${n(8)}px ${n(0)}px ${n(8)}px ${n(0)}px;
  flex: 1;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%; */

  ${props => props.fill && fill}
  ${props => props.gray && gray}
  ${props => props.fillGray && fillGray}
  ${props => props.line && line}
  ${props => props.pinkLine && pinkLine}
  ${props => props.disabled && disabled}
  ${props => props.kakao && kakao}
  ${props => props.apple && apple}
  ${props => props.red && red}
  ${props => props.grayLine && grayLine}
`;

S.Text = styled.Text`
  color: ${colors.white};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  ${props => props.fill && fill}
  ${props => props.fillGray && fillGray}
  ${props => props.gray && gray}
  ${props => props.line && line}
  ${props => props.pinkLine && pinkLine}
  ${props => props.disabled && disabled}
  ${props => props.kakao && kakao}
  ${props => props.apple && apple}
  ${props => props.grayLine && grayLine}
  border: 1px solid transparent !important;
`;

S.SpinnerWrapper = styled.View`
  position: absolute;
  top: ${n(6)}px;
  left: ${n(8)}px;
`;
S.SpinnerContainer = styled.View`
  position: relative;
`;
