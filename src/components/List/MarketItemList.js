import {Sv, St} from 'components/index';
import n from 'helper/normalize';
import React from 'react';
import {Image, Pressable, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import dummy from 'images/png/img-logo.png';

const BADGE_STATE_STYLE = {
  100: {
    backgroundColor: colors.primary,
    textColor: colors.white,
    text: '판매중',
  }, // 판매중
  200: {
    backgroundColor: colors.g2,
    textColor: colors.white,
    text: '거래 진행중',
  }, // 거래 진행중
  300: {
    backgroundColor: colors.g6,
    textColor: colors.g4,
    text: '거래완료',
  }, // 판매 완료
  400: {
    backgroundColor: colors.pink,
    textColor: colors.white,
    text: '거절됨',
  },
};

export const MarketItemList = ({
  url,
  title,
  subtitle,
  badgeState,
  price = 0,
  onPress = () => {},
  isReadRequired,
}) => {
  const Badge = () => {
    if (!badgeState) return null;
    return (
      <S.BadgeContainer badgeStyle={BADGE_STATE_STYLE[badgeState]}>
        <St s4 style={{color: BADGE_STATE_STYLE[badgeState].textColor}}>
          {BADGE_STATE_STYLE[badgeState].text}
        </St>
      </S.BadgeContainer>
    );
  };
  return (
    <Sv as={TouchableOpacity} row py={12} px={18} onPress={onPress}>
      <Sv mr={14}>
        <S.ItemImage
          source={
            url
              ? {
                  uri: url,
                }
              : dummy
          }
        />
      </Sv>
      <Sv col jsb>
        <Sv col>
          <St s3 g0>
            {title}
          </St>
          <St c2 g3>
            {subtitle}
          </St>
        </Sv>
        <Sv row>
          <Badge />
          <St s3 g0 ml={6}>
            {parseInt(price).toLocaleString()}원
          </St>
        </Sv>
      </Sv>
      {isReadRequired && <S.BadgeRead />}
    </Sv>
  );
};

const S = {};

S.ItemImage = styled(Image)`
  width: ${n(80)}px;
  height: ${n(80)}px;
  border-radius: ${n(8)}px;
  background-color: ${colors.g6};
`;

S.BadgeContainer = styled.View`
  padding: ${n(2)}px ${n(6)}px;
  ${props => {
    return `
        background-color: ${props.badgeStyle.backgroundColor};
        `;
  }}
  border-radius: ${n(7)}px;
`;

S.BadgeRead = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  width: ${n(12)}px;
  height: ${n(12)}px;
  border-radius: ${n(10)}px;
  background-color: ${colors.red};
`;
