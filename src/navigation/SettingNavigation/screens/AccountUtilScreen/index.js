import {HeaderL, SingleLineList, Sv} from 'components/index';
import React from 'react';
import {Alert, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import DocumentPicker from 'react-native-document-picker';

export const AccountUtilScreen = ({navigation}) => {
  const goAccountBackupScreen = () => {
    // showAlreadyAccountAlert();
    navigation.navigate('AccountBackupScreen');
  };

  const showAlreadyAccountAlert = () => {
    Alert.alert(
      '페퍼간편주소 복원',
      '이미 어플리케이션에 사용중이 페퍼간편주소가 있습니다.',
      [{text: '확인', onPress: () => {}}],
    );
  };

  const getKeyFileUrl = async () => {
    try {
      const response = await DocumentPicker.pickSingle();
      navigation.navigate('AccountRestoreScreen', {
        file_uri: response.uri,
      });
    } catch (e) {}
  };

  return (
    <S.Container>
      <HeaderL title="간편주소 백업/복원" />
      <Sv px={20}>
        <SingleLineList
          py={16}
          title="백업하기"
          hasArrow
          onPress={goAccountBackupScreen}
        />
        <SingleLineList
          py={16}
          title="복원하기"
          hasArrow
          onPress={getKeyFileUrl}
        />
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
