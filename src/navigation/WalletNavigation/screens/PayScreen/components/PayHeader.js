import React from 'react';
import {View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import n from 'helper/normalize';
import {colors} from 'styles/colors';

//components
import {St, Sv, HeaderL} from 'components/index';
import {useSelector} from 'react-redux';

export const PayHeader = ({selectedTab, setSelectedTab}) => {
  const {balance} = useSelector(state => state.account);

  return (
    <SafeAreaView>
      <Sv>
        <HeaderL title={'송금을 위해\n정보를 입력해주세요'} />
        <St mx={22} g3>
          {'출금가능금액'} {balance.toLocaleString()}원
        </St>
      </Sv>
      <S.ChoiceView>
        <S.ChoiceItemView
          active={selectedTab === 0}
          onPress={() => setSelectedTab(0)}>
          <S.ChoiceItemText>간편주소</S.ChoiceItemText>
        </S.ChoiceItemView>
        <S.ChoiceItemView
          active={selectedTab === 1}
          onPress={() => setSelectedTab(1)}>
          <S.ChoiceItemText>은행</S.ChoiceItemText>
        </S.ChoiceItemView>
        {/* <S.ChoiceItemView
          active={selectedTab === 2}
          onPress={() => setSelectedTab(2)}>
          <S.ChoiceItemText>최근</S.ChoiceItemText>
        </S.ChoiceItemView> */}
      </S.ChoiceView>
    </SafeAreaView>
  );
};

const S = {};

S.Container = styled(View)`
  background-color: white;
  flex: 1;
  padding-top: 30px;
`;

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.ChoiceView = styled(View)`
  margin-top: 18px;
  background-color: ${colors.g6};
  border-radius: ${n(20)};
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex-direction: row;
  margin-left: ${n(22)};
  margin-right: ${n(22)};
`;

S.ChoiceItemView = styled(TouchableOpacity)`
  flex: 1;
  background-color: ${props => (props.active ? colors.white : colors.g6)};
  border-radius: ${n(18.5)}px;
  padding-top: ${n(7)}px;
  padding-bottom: ${n(7)}px;
  align-items: center;
  justify-content: center;
`;

S.ChoiceItemText = styled(St)`
  color: ${props => (props.active ? colors.black : colors.g0)};
  font-size: ${n(16)}px;
  font-weight: 600;
  line-height: ${n(22.4)}px;
`;
