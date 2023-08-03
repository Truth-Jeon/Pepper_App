import {Sv, St, BadgeS} from 'components';
import React from 'react';
import styled, {css} from 'styled-components';
import {colors} from 'styles/colors';
import {Platform} from 'react-native';
import n from 'helper/normalize';
import {Image} from 'react-native';
import dummy from 'images/Dummy.png';
import moment from 'moment';
import {getPower, getTimeRange, getDDay, getGameType} from 'helper/formatter';
import ImgBall from 'images/ball.png';

export const MatchList = ({
  onPress,
  gameType = '',
  court = '',
  region = '',
  date = '',
  startTime = '',
  endTime = '',
  manCount = 0,
  womanCount = 0,
  power = '',
  imgSrc,
  d_day = '',
  isPay,
  isHandOver,
  isComplete,
}) => {
  const getBadge = gameType => {
    let gameTypeName = getGameType(gameType);
    switch (gameTypeName) {
      case '남복':
        return <BadgeS bg={colors.blue} title={gameTypeName} />;
      case '여복':
        return <BadgeS bg={colors.pink} title={gameTypeName} />;
      case '혼복':
        return <BadgeS bg={colors.secondary} title={gameTypeName} />;
      case '단식':
        return <BadgeS bg="#C3CD49" title={gameTypeName} />;
      case '랠리':
        return <BadgeS bg="#FF9900" title={gameTypeName} />;
      default:
        return;
    }
  };

  const getCompleteState = () => {
    if (moment(d_day)?.diff(moment(), 'days') < 0 || isComplete) {
      return (
        <Sv act w={60}>
          <St s2 g4>
            {getDDay(d_day)}
          </St>
        </Sv>
      );
    }
    return (
      <Sv act w={60}>
        <St s2 primary>
          {getDDay(d_day)}
        </St>
      </Sv>
    );
  };

  return (
    <S.Container
      onPress={onPress && onPress}
      isComplete={moment(d_day)?.diff(moment(), 'days') < 0 || isComplete}
      platform={Platform.OS}>
      <Sv row act jsb>
        <Sv row act>
          <Sv>
            {imgSrc ? (
              <S.Image source={{uri: imgSrc}} />
            ) : (
              <S.Image source={dummy} />
            )}
          </Sv>
          <Sv ml={8}>
            <Sv row act>
              {getBadge(gameType[0])}
              {isPay && (
                <BadgeS
                  bg={colors.primary}
                  title={
                    <Sv pt={3} mb={-2}>
                      <S.BallImage source={ImgBall} />
                    </Sv>
                  }
                />
              )}
              <Sv w={200}>
                <St
                  b2
                  g1={!isComplete}
                  g4={isComplete}
                  ml={4}
                  numberOfLines={1}>
                  {region} {court}
                </St>
              </Sv>
            </Sv>
            <Sv mt={2}>
              <St c3 g3={!isComplete} g4={isComplete} ml={4}>
                {date} {getTimeRange(startTime, endTime)}
                {isHandOver ||
                  (manCount || womanCount
                    ? ' · ' +
                      (manCount ? '남' + manCount : '') +
                      ' ' +
                      (womanCount ? '여' + womanCount : '') +
                      ' · '
                    : ' · 성별무관 · ')}
                {getPower(power)}
              </St>
            </Sv>
          </Sv>
        </Sv>
        <S.DDayContainer>
          {isComplete ? (
            <Sv w={60} act>
              <St s2 g4>
                완료
              </St>
            </Sv>
          ) : (
            getCompleteState()
          )}
        </S.DDayContainer>
      </Sv>
    </S.Container>
  );
};

const S = {};

const iosShadow = css`
  shadow-color: ${colors.g5};
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  shadow-offset: 0px 5px;

  elevation: 5;
`;

const androidShadow = css`
  shadow-color: ${colors.g4};
  elevation: 15;
`;

S.Container = styled.TouchableOpacity`
  background-color: ${props => (props.isComplete ? colors.g7 : 'white')};
  border-radius: ${n(8)}px;
  border: 1px solid ${colors.g6};
  padding: 16px;
  ${props => (props.platform == 'ios' ? iosShadow : androidShadow)}
`;

S.Image = styled.Image`
  width: ${n(42)}px;
  height: ${n(42)}px;
  background-color: ${colors.g4};
  border-radius: ${n(8)}px;
`;

S.BallImage = styled(Image)`
  width: ${n(14)}px;
  height: ${n(14)}px;
`;

S.DDayContainer = styled.View`
  position: absolute;
  top: ${n(10)}px;
  right: ${n(-12)}px;
`;
