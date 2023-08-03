import {Sv, St, ButtonL} from 'components/index';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {Image} from 'react-native';
import n from 'helper/normalize';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import profileDummy from 'images/profileDummy.png';
import dummy from 'images/Dummy.png';
import IcYellowCard from 'images/IcYellowCard.svg';
import IcCertification from 'images/IcCertification.svg';

export const ProfileSmall = ({
  name = '',
  region = '',
  time = '',
  profileImgSrc,
  imgSrc,
  content,
  buttonText,
  buttonPress,
  isDisabledButton,
  hasYellowCard,
  hasMark,
}) => {
  return (
    <>
      <Sv as={ScrollView} mt={-88}>
        {imgSrc ? (
          <S.Image source={{uri: imgSrc}} />
        ) : (
          <S.Image source={dummy} />
        )}

        <Sv h={`100%`} mt={280} pb={100} bg={'white'}>
          <Sv p={20} row>
            <Sv>
              {profileImgSrc ? (
                <S.ProfileImage source={{uri: profileImgSrc}} />
              ) : (
                <S.ProfileImage source={profileDummy} />
              )}
              {hasYellowCard && (
                <S.YellowCareWrapper>
                  <IcYellowCard width={18} />
                </S.YellowCareWrapper>
              )}
            </Sv>
            <Sv ml={12}>
              <Sv row act>
                <St s2 g1>
                  {name}
                </St>
                {hasMark && (
                  <Sv ml={2}>
                    <IcCertification />
                  </Sv>
                )}
              </Sv>
              <Sv row>
                {region ? (
                  <St b2 g3>
                    {region} ·{' '}
                  </St>
                ) : (
                  <></>
                )}
                <St b2 g3>
                  {time}
                </St>
              </Sv>
            </Sv>
          </Sv>
          <Sv h={8} bg={colors.g6} />
          {content}
        </Sv>
      </Sv>
      <S.ButtonWrapper>
        <ButtonL
          onPress={buttonPress && buttonPress}
          title={buttonText}
          disabled={isDisabledButton}
        />
      </S.ButtonWrapper>
    </>
  );
};

const S = {};

S.Image = styled.Image`
  height: ${n(282)}px;
  resize-mode: cover;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

S.ProfileImage = styled.Image`
  width: ${n(44)}px;
  height: ${n(44)}px;
  border-radius: 100px;
`;

S.ButtonWrapper = styled.View`
  position: absolute;
  bottom: ${n(16)}px;
  left: 0;
  right: 0;
  padding: ${n(16)}px;
`;

S.YellowCareWrapper = styled.View`
  position: absolute;
  right: ${n(-6)}px;
  bottom: ${n(-2)}px;
`;
