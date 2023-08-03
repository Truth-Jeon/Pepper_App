import {Sv, St, BadgeS} from 'components';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {Image} from 'react-native';
import n from 'helper/normalize';
import IcMore from 'images/IcMore.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ReplyCommentList = ({
  onPress,
  name = '',
  title = '',
  body = '',
  date = '',
  likeCount = ``,
  viewCount = ``,
  commentCount = ``,
  isWriter = true,
  sex = '',
}) => {
  return (
    <S.Container onPress={onPress && onPress}>
      <Sv p={16} ml={32}>
        <Sv row jsb act mt={-8}>
          <Sv row act>
            <S.SexDot sex={sex} />
            <St s4 g0 ml={4}>
              {name}
            </St>
            {isWriter && (
              <St c2 primary ml={2}>
                (글쓴이)
              </St>
            )}
          </Sv>
          <Sv as={TouchableOpacity}>
            <IcMore />
          </Sv>
        </Sv>
        <Sv>
          <St c2 g0>
            {body}
          </St>
        </Sv>
        <Sv row act>
          <St c2 g3 mt={4}>
            {date}
          </St>
        </Sv>
      </Sv>
      <Sv mx={16} h={1} bg={colors.g5} />
    </S.Container>
  );
};

const S = {};

S.Container = styled.View`
  background-color: ${colors.g7};
`;

S.SexDot = styled.View`
  width: ${n(4)}px;
  height: ${n(4)}px;
  border-radius: 100px;
  background-color: ${props =>
    props.sex == 'male' ? colors.blue : colors.pink};
`;
