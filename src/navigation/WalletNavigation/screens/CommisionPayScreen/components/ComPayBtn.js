import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {useNavigation} from '@react-navigation/native';

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

export const ComPayBtn = () => {
  const navigation = useNavigation();

  const gottesScreen = () => {
    navigation.navigate('');
  };

  // 서비스 오류 알림
  goAlert = () =>
    Alert.alert(
      '서비스 오류',
      '서비스 이용에 불편을 드려 죄송합니다 \n잠시후에 다시 시도해주세요.',
      [{text: '확인', onPress: () => navigation.navigate('RechargeScreen')}],
      {cancelable: false},
    );

  return (
    <Sv mx={22} mb={22}>
      <ButtonL title="다음" onPress={this.goAlert} />
    </Sv>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

S.ImgList = styled(Image)`s
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.NoticeBtn = styled(Pressable)`
  align-items: center;
  justify-content: center;
`;
