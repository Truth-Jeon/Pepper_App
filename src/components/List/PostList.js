import {Sv, St, BadgeS} from 'components';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {Image} from 'react-native';
import n from 'helper/normalize';
import IcLike from 'images/IcLike.svg';
import IcLikeOn from 'images/IcLikeOn.svg';
import IcView from 'images/IcView.svg';
import IcComment from 'images/IcComment.svg';
import IcBookmark from 'images/IcBookmark.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';
import React, {useCallback, useEffect, useState, useRef} from 'react';

import {SliderBox} from 'react-native-image-slider-box';

export const PostList = ({
  onPress,
  name = '',
  title = '',
  body = '',
  date = '',
  likeCount = ``,
  viewCount = ``,
  commentCount = ``,
  isHot = false,
  sex = '',
  images = [],
  onPressLike,
  isLiked,
}) => {
  const [visible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    console.log(images, 'images');
  }, []);
  return (
    <S.Container onPress={onPress && onPress}>
      <ImageView
        images={images.map(v => ({uri: v.image}))}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
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
          <St b1>{title}</St>
        </Sv>
        <Sv mt={8}>
          <St c2 g3>
            {body}
          </St>
        </Sv>
      </Sv>
      <Sv h={1} bg={colors.g6} />
      {images.length > 0 && (
        <Sv bg={colors.g7}>
          <SliderBox
            onClick={() => {
              setIsVisible(true);
            }}
            onCurrentImagePressed={index => {
              setIsVisible(true);
              setCurrentImage(index);
            }}
            images={images.map((v, i) => v.image)}
            sliderBoxHeight={375}
            dotColor={colors.white}
            inactiveDotColor={colors.g3}
            resizeMode="contain"
          />
        </Sv>
      )}
      <Sv h={1} bg={colors.g6} />
      <Sv px={12} row act jsb>
        <Sv row act ml={4}>
          <Sv py={12} row act as={TouchableOpacity} onPress={onPressLike}>
            {isLiked ? <IcLikeOn /> : <IcLike />}
            <St c3 g3 ml={2} mr={24}>
              {likeCount}
            </St>
          </Sv>
          <IcView />
          <St c3 g3 ml={2} mr={24}>
            {viewCount}
          </St>
          <IcComment />
          <St c3 g3 ml={2}>
            {commentCount}
          </St>
        </Sv>
      </Sv>
      <Sv h={6} bg={colors.g6} />
    </S.Container>
  );
};

const S = {};

S.Container = styled.View`
  background-color: white;
`;

S.SexDot = styled.View`
  width: ${n(4)}px;
  height: ${n(4)}px;
  border-radius: 100px;
  background-color: ${props =>
    props.sex == 'male' ? colors.blue : colors.pink};
`;
