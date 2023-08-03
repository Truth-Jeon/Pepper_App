import {Sv, St, BadgeS} from 'components';
import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {colors} from 'styles/colors';
import {Platform} from 'react-native';
import n from 'helper/normalize';
import IcLike from 'images/IcLike.svg';
import IcLikeOn from 'images/IcLikeOn.svg';

import IcView from 'images/IcView.svg';
import IcComment from 'images/IcComment.svg';
import IcBookmark from 'images/IcBookmark.svg';
import IcBookmarkOn from 'images/IcBookmarkOn.svg';
import {TouchableOpacity} from 'react-native';

export const PostCardList = ({
  onPress,
  onPressBookmark,
  name = '',
  title = '',
  body = '',
  date = '',
  likeCount = ``,
  viewCount = ``,
  commentCount = ``,
  isHot = false,
  sex = 'M',
  isBookmarked,
  isLiked,
}) => {
  return (
    <S.Container onPress={onPress && onPress} platform={Platform.OS}>
      <Sv>
        <Sv p={16}>
          <Sv row jsb act>
            <Sv row act>
              <S.SexDot sex={sex} />
              <St s4 g0 ml={4}>
                {name}
              </St>
              <St c2 g3 ml={8}>
                {date}
              </St>
            </Sv>
            {isHot && (
              <St c2 style={{color: colors.red}}>
                HOT
              </St>
            )}
          </Sv>
          <Sv mt={4}>
            <St b1 numberOfLines={1}>
              {title}
            </St>
          </Sv>
          <Sv mt={8}>
            <St c2 g3 numberOfLines={3}>
              {body}
            </St>
          </Sv>
        </Sv>
        <Sv h={1} bg={colors.g6} />
        <Sv pl={12} row act jsb>
          <Sv row act ml={4}>
            {isLiked ? <IcLikeOn /> : <IcLike />}
            <St c3 g3 ml={2} mr={24}>
              {likeCount}
            </St>
            <IcView />
            <St c3 g3 ml={2} mr={24}>
              {viewCount}
            </St>
            <IcComment />
            <St c3 g3 ml={2}>
              {commentCount}
            </St>
          </Sv>
          <Sv as={TouchableOpacity} p={12} onPress={onPressBookmark}>
            {isBookmarked ? <IcBookmarkOn /> : <IcBookmark />}
          </Sv>
        </Sv>
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
  background-color: white;
  border-radius: ${n(8)}px;
  border: 1px solid ${colors.g6};
  ${props => (props.platform == 'ios' ? iosShadow : androidShadow)}
`;

S.SexDot = styled.View`
  width: ${n(4)}px;
  height: ${n(4)}px;
  border-radius: 100px;
  background-color: ${props => (props.sex == 'M' ? colors.blue : colors.pink)};
`;
