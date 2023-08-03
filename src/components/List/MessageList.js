import {Sv, St} from 'components';
import React from 'react';
import styled, {css} from 'styled-components';
import {colors} from 'styles/colors';
import {Platform} from 'react-native';
import n from 'helper/normalize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import profileDummy from 'images/profileDummy.png';
import {BadgeS} from 'components/index';
import FastImage from 'react-native-fast-image';

export const MessageList = ({
  onPress,
  name = '',
  body = '',
  time = '',
  sex = '',
  power = '',
  imgSrc,
  newCount = 1,
  isEditMode = false,
  onPressEdit,
  chatType,
}) => {
  return (
    <S.Container
      platform={Platform.OS}
      onPress={onPress && onPress}
      as={isEditMode ? Sv : TouchableOpacity}>
      <Sv row act jsb>
        <Sv row act>
          <Sv>
            {imgSrc ? (
              <S.Image source={{uri: imgSrc}} />
            ) : (
              <S.Image source={profileDummy} />
            )}
          </Sv>
          <Sv ml={8} style={{flex: 1}}>
            <Sv row act>
              <St b2 g1 ml={4}>
                {chatType == 'MATCH' ? '[매칭] ' : ''}
                {name}
              </St>
            </Sv>
            <Sv mt={2}>
              <St numberOfLines={2} c3 g3 ml={4}>
                {body}
              </St>
            </Sv>
          </Sv>
          <Sv aed>
            <St c3 g4>
              {time}
            </St>
            <Sv row act mt={4}>
              {newCount != 0 && (
                <S.NewCountBadge>
                  <St c3 white>
                    {newCount}
                  </St>
                </S.NewCountBadge>
              )}
              {isEditMode && (
                <Sv
                  onPress={onPressEdit && onPressEdit}
                  py={4}
                  ml={8}
                  as={TouchableOpacity}>
                  <St c3 red>
                    삭제
                  </St>
                </Sv>
              )}
            </Sv>
          </Sv>
        </Sv>
      </Sv>
    </S.Container>
  );
};

const S = {};

const iosShadow = css`
  shadow-color: ${colors.g6};
  shadow-opacity: 1;
  shadow-offset: 0px 5px;
  shadow-radius: 10px;
`;

const androidShadow = css`
  shadow-color: ${colors.g4};
  shadow-opacity: 1;
  shadow-offset: 0px 5px;
  shadow-radius: 10px;
  elevation: 15;
`;

S.Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: ${n(8)}px;
  padding: 16px;

  ${props => (props.platform == 'ios' ? iosShadow : androidShadow)}
`;

S.Image = styled(FastImage)`
  width: ${n(40)}px;
  height: ${n(40)}px;
  background-color: ${colors.g4};
  border-radius: ${n(100)}px;
`;

S.NewCountBadge = styled.View`
  width: ${n(20)}px;
  height: ${n(20)}px;
  border-radius: 100px;
  background-color: ${colors.red};
  justify-content: center;
  align-items: center;
`;
