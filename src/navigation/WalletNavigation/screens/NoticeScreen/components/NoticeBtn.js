import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {useNavigation} from '@react-navigation/native';
import {ModalSlide} from 'components/Modal/ModalSlide';
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
import {Pressable} from 'react-native';

export const NoticeBtn = ({isVisible, setIsVisible}) => {
  const navigation = useNavigation();

  const goPayConfScreen = () => {
    navigation.navigate('CommissionScreen');
  };
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

  const renderModalComponent = () => {
    return (
      <>
        <S.ChoiceView>
          <S.ChoiceItemView
            active={isSelect[0]}
            onPress={() => onPressChoiseItem(0)}>
            <S.ChoiceItemText>증권사</S.ChoiceItemText>
          </S.ChoiceItemView>
          <S.ChoiceItemView
            active={isSelect[1]}
            onPress={() => onPressChoiseItem(1)}>
            <S.ChoiceItemText>은행</S.ChoiceItemText>
          </S.ChoiceItemView>
        </S.ChoiceView>

        <Sv mt={22}>
          <Sv row>
            <Sv f={1}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
            <Sv f={1} mx={8}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
          </Sv>
          <Sv mt={10} row>
            <Sv f={1}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
            <Sv f={1} mx={8}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
          </Sv>
          <Sv mt={10} row>
            <Sv f={1}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
            <Sv f={1} mx={8}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
          </Sv>
          <Sv mt={10} row>
            <Sv f={1}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
            <Sv f={1} mx={8}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
          </Sv>
          <Sv mt={10} row>
            <Sv f={1}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
            <Sv f={1} mx={8}>
              <ButtonL fillGray title="카카오뱅크" />
            </Sv>
          </Sv>
          <Sv mt={10} row>
            <Sv f={1}>
              <ButtonL
                fillGray
                title="카카오뱅크"
                onPress={() => setIsVisible(false)}
              />
            </Sv>
            <Sv f={1} mx={8}>
              <ButtonL
                fillGray
                title="카카오뱅크"
                // onPress={goPayConfScreen}
                onPress={() => setIsVisible(false)}
              />
            </Sv>
          </Sv>
        </Sv>
      </>
    );
  };

  return (
    <S.Container>
      <View>
        <Sv mx={22}>
          <ButtonL title="본인 인증하기" onPress={() => setIsVisible(true)} />
        </Sv>
      </View>
      <ModalSlide
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        renderComponent={renderModalComponent}
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  /* flex: 1; */
`;

S.ImgList = styled(Image)`s
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
