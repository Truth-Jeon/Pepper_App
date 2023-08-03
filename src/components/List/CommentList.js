import {Sv, St, BadgeS} from 'components';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {Image} from 'react-native';
import n from 'helper/normalize';
import IcMore from 'images/IcMore.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const CommentList = ({
  onPress,
  name = '',
  title = '',
  body = '',
  date = '',
  onPressReply,
  onPressCommentMore,
  isWriter = true,
  sex = '',
  reply = false,
  noReply = false,
}) => {
  return (
    <S.Container onPress={onPress && onPress} reply={reply}>
      <Sv pt={10} pb={16} px={16}>
        <Sv row jsb act>
          <Sv row act>
            <S.SexDot sex={sex} />
            <St s4 g0 ml={4}>
              익명
            </St>
            {isWriter && (
              <St c2 primary ml={2}>
                (글쓴이)
              </St>
            )}
          </Sv>
          <Sv as={TouchableOpacity} onPress={onPressCommentMore}>
            <IcMore />
          </Sv>
        </Sv>
        <Sv>
          <St c2 g0>
            {body}
          </St>
        </Sv>
        <Sv row act>
          <St c2 g3>
            {date}
          </St>
          {!noReply && (
            <Sv p={4} ml={8} as={TouchableOpacity} onPress={onPressReply}>
              <St c2 g3>
                답글달기
              </St>
            </Sv>
          )}
        </Sv>
      </Sv>
      <Sv mx={16} h={1} bg={colors.g6} />
    </S.Container>
  );
};

const S = {};

S.Container = styled.View`
  background-color: ${props => (props.reply ? colors.g7 : colors.white)};
  padding-left: ${props => (props.reply ? 28 : 0)}px;
`;

S.SexDot = styled.View`
  width: ${n(4)}px;
  height: ${n(4)}px;
  border-radius: 100px;
  background-color: ${props => (props.sex == 'M' ? colors.blue : colors.pink)};
`;
