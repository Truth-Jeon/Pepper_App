import {ButtonL, HeaderL, InputM, St, Sv} from 'components/index';
import React from 'react';
import IcComplete from 'images/svg/ic-complete-check.svg';
import styled from 'styled-components';
import n from 'helper/normalize';

export const PayCompleteScreen = ({navigation, route}) => {
  const title = route.params?.title;

  const goBack = () => {
    if (route.params?.isMarket) {
      navigation.goBack();
      navigation.goBack();
    } else {
      navigation.popToTop();
    }
  };
  return (
    <S.Container>
      <Sv px={22} act mt={140}>
        <IcComplete />
        <S.Text>성공적으로 {title}하였습니다.</S.Text>
      </Sv>
      <S.ButtonContainer>
        <ButtonL title="확인" onPress={goBack} />
      </S.ButtonContainer>
    </S.Container>
  );
};

const S = {};

S.Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

S.Text = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20;

  color: #161d24;
`;

S.ButtonContainer = styled.View`
  position: absolute;
  bottom: ${n(16)}px;
  right: 0;
  left: 0;

  padding: ${n(20)}px;
`;
