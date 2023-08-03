import {Sv, St, Chip} from 'components';
import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {Image} from 'react-native';
import n from 'helper/normalize';
import IcYellowCard from 'images/IcYellowCard.svg';
import IcArrow from 'images/IcArrow.svg';
import IcCertification from 'images/IcCertification.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import profileDummy from 'images/profileDummy.png';

export const Profile = ({
  onPressEdit,
  name = '',
  hasYellowCard = true,
  hasMark = true,

  imgSrc,
}) => {
  return (
    <>
      <S.Container>
        <Sv row act>
          <Sv>
            {imgSrc ? (
              <S.Image source={{uri: imgSrc}} />
            ) : (
              <S.Image source={profileDummy} />
            )}
            {hasYellowCard && (
              <S.YellowCareWrapper>
                <IcYellowCard />
              </S.YellowCareWrapper>
            )}
          </Sv>
          <Sv ml={16}>
            <Sv row act>
              <St b1 g1 bold mr={4}>
                {name}
              </St>
              {hasMark && (
                <Sv mr={4}>
                  <IcCertification />
                </Sv>
              )}
              {/* <IcArrow /> */}
            </Sv>
            <Sv mt={6}>
              <Chip
                hasArrow={false}
                title="프로필 수정"
                onPress={onPressEdit}
              />
            </Sv>
          </Sv>
        </Sv>
      </S.Container>
      <Sv h={1} bg={colors.g6} mx={20} />
    </>
  );
};

const S = {};

S.Container = styled.View`
  background-color: white;
  border-radius: ${n(8)}px;
  padding: 20px;
`;

S.Image = styled.Image`
  width: ${n(64)}px;
  height: ${n(64)}px;
  background-color: ${colors.g4};
  border-radius: ${n(24)}px;
`;

S.YellowCareWrapper = styled.View`
  position: absolute;
  right: ${n(-6)}px;
  bottom: 0;
`;
