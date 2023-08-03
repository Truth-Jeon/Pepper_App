import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import React, {useState} from 'react';
import {cloneDeep} from 'lodash';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';

//images
import LogoPepper from 'images/svg/logo-pepper.svg';
import ImgList from 'images/png/img-list.png';

export const ComPayInput = () => {
  const [isSelect, setIsSelect] = useState([true, false]);

  const onPressChoiseItem = index => {
    const oldSelect = cloneDeep(isSelect);
    const originalValue = oldSelect[index];

    let newSelect = [];
    for (let i = 0; i < isSelect.length; i++) {
      newSelect.push(false);
    }
    newSelect[index] = !originalValue;

    setIsSelect(newSelect);
  };
  return (
    <Sv mx={30}>
      <St g3>{'차감예정금액'}</St>
      <Sv mt={10}>
        <InputL placeholder="10,000원" numberType />
      </Sv>

      <Sv mt={30}>
        <St g3>{'보유금액'}</St>
        <Sv mt={10}>
          <InputL placeholder="20,000원" numberType />
        </Sv>
      </Sv>

      <Sv mt={30}>
        <St g3>{'송금요청금액'}</St>
        <Sv mt={10}>
          <InputL placeholder="10,000원" numberType />
        </Sv>
      </Sv>
      <S.ChoiceView>
        <S.ChoiceItemView
          active={isSelect[0]}
          onPress={() => onPressChoiseItem(0)}>
          <S.ChoiceItemText>수취인부담</S.ChoiceItemText>
        </S.ChoiceItemView>
        <S.ChoiceItemView
          active={isSelect[1]}
          onPress={() => onPressChoiseItem(1)}>
          <S.ChoiceItemText>송금인부담</S.ChoiceItemText>
        </S.ChoiceItemView>
      </S.ChoiceView>
    </Sv>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;
S.ChoiceView = styled(View)`
  margin-top: 24px;
  background-color: ${colors.g6};
  border-radius: ${n(20)};
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex-direction: row;
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
