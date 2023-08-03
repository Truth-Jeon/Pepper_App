import {Sv, St, ButtonS} from 'components';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import n from 'helper/normalize';
import profileDummy from 'images/png/img-profile-dummy.png';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

export const SpeechBubble = ({
  navigation,
  profileOnPress,
  onPress,
  style,
  imgSrc,
  nickname = '',
  body = '',
  time = '',
  right = false,
  isContinued = false,
  onLongPress,
}) => {
  return (
    <Container
      activeOpacity={1}
      isContinued={isContinued}
      onPress={onPress && onPress}
      onLongPress={onLongPress && onLongPress}
      style={style}
      isRight={right}>
      {right || (
        <TouchableOpacity onPress={profileOnPress}>
          {imgSrc ? (
            <ProfileImage source={{uri: imgSrc}} />
          ) : (
            <ProfileImage source={profileDummy} />
          )}
        </TouchableOpacity>
      )}

      <Sv col ml={6} style={right ? {alignItems: 'flex-end'} : {}}>
        <Sv row aed style={right ? {flexDirection: 'row-reverse'} : {}}>
          <Sv bg={right ? colors.g2 : colors.g6} br={16} px={14} py={8}>
            {right ? (
              <St c1 white style={{maxWidth: n(200), fontSize: n(15)}}>
                {body}
              </St>
            ) : (
              <St c1 g1 style={{maxWidth: n(200), fontSize: n(15)}}>
                {body}
              </St>
            )}
          </Sv>
          {!isContinued && (
            <Sv act>
              <St c3 g3 mx={8}>
                {moment(time).format('A hh:mm')}
              </St>
            </Sv>
          )}
        </Sv>
      </Sv>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  display: flex;
  align-items: flex-start;
  margin: 0px 16px;
  flex-direction: ${props => (props.isRight ? 'row-reverse' : 'row')};
  margin-bottom: ${props => (props.isContinued ? n(4) : n(8))};
`;

const ProfileImage = styled(FastImage)`
  width: ${n(34)}px;
  height: ${n(34)}px;
  background-color: ${colors.g4};
  border-radius: 100px;
`;
