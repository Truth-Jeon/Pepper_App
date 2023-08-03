import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import IcArrowLeft from 'images/svg/ic-arrow-left.svg';
import {ProgressBar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const HeaderL = ({
  hasBack = true,
  title = '',
  hasButton = false,
  hasAlertBackPress = false,
  right,
  progress = 0.5,
  hasProgress,
  customBackPress,
}) => {
  const goBack = () => {
    if (hasAlertBackPress) {
      Alert.alert(
        '정말 뒤로 가시겠어요?', // 첫번째 text: 타이틀 제목
        '진행중인 작업이 사라집니다.', // 두번째 text: 그 밑에 작은 제목
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '뒤로가기',
            onPress: () => {
              if (navigation.canGoBack()) navigation.goBack();
              // deep link 때문에 뒤로 갈 수 없으면 홈으로 갑니다.
              else navigation.replace('HomeScreen');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      if (customBackPress) customBackPress();
      else {
        navigation.goBack();
      }
      // if (navigation.canGoBack()) navigation.goBack();
      // // deep link 때문에 뒤로 갈 수 없으면 홈으로 갑니다.
      // else navigation.replace('HomeScreen');
    }
  };
  const navigation = useNavigation();

  return (
    <>
      <S.HeaderWrapper>
        <Sv>
          {hasBack && (
            <Sv as={TouchableOpacity} onPress={goBack}>
              <IcArrowLeft style={{color: colors.g3}} />
            </Sv>
          )}
          {hasProgress && (
            <Sv px={16} mt={6} mb={-8}>
              <ProgressBar progress={progress} color={colors.primary} />
            </Sv>
          )}

          <Sv ml={20} mr={20} mt={24} pb={40}>
            <St h3 g0>
              {title}
            </St>
          </Sv>
        </Sv>
        <Sv row act>
          {right}
        </Sv>
      </S.HeaderWrapper>
    </>
  );
};

const S = {};

S.HeaderWrapper = styled.View`
  background-color: white;
`;

S.ButtonWrapper = styled(TouchableOpacity)`
  /* padding: ${n(12)}px ${n(20)}px; */
`;

S.ProgressWrapper = styled.View``;
