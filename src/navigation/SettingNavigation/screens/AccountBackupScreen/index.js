import {
  ButtonL,
  HeaderL,
  InputM,
  SingleLineList,
  St,
  Sv,
} from 'components/index';
import React, {useState} from 'react';
import {Platform, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {AccountBackupCompleteLayout} from './layouts/AccountBackupCompleteLayout';
import {AccountInfoLayout} from './layouts/AccountInfoLayout';
import {AccountPasswordLayout} from './layouts/AccountPasswordLayout';
import {useSelector} from 'react-redux';
import Aes from 'react-native-aes-crypto';
import base64 from 'base-64'; // 없는 경우 설치 : npm install base-64
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {toastShowTop} from 'helper/toastHelper';

export const AccountBackupScreen = ({navigation}) => {
  const {private_key} = useSelector(state => state.account);

  const RSA_KEYTAG = '1i!8d!fd038dxyq(p58_8gvv=dezp@myj&gqkz#=+2udo$r_m)';

  const [status, setStatus] = useState(0);
  const [passwordStatus, setPasswordStatus] = useState(0);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [fileName, setFileName] = useState('');

  const generateKey = (password, salt, cost, length) =>
    Aes.pbkdf2(password, salt, cost, length);

  const encryptData = (text, key) => {
    return Aes.randomKey(16).then(iv => {
      return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
        cipher,
        iv,
      }));
    });
  };

  const onPressNextButton = async () => {
    if (status === 0) {
      if (fileName.length > 0) {
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(fileName)) {
          if (fileName.length < 3 || fileName.length > 10) {
            toastShowTop('error', '3~10자의 영문 또는 숫자만 가능합니다.');
          } else {
            setStatus(1);
          }
        } else {
          toastShowTop('error', '파일명은 영문및 숫자만 가능합니다.');
        }
      } else {
        toastShowTop('error', '파일명을 입력해주세요.');
      }
    } else if (status === 1) {
      if (passwordStatus === 0) {
        setPasswordStatus(1);
      } else {
        if (password === password2) {
          setStatus(2);
        } else {
          toastShowTop('error', '비밀번호가 일치하지 않습니다.');
        }
      }
    } else {
      navigation.goBack();
    }
  };

  const saveFile = async () => {
    const key = await generateKey(password, RSA_KEYTAG, 5000, 256);
    const encryptText = await encryptData(private_key, key);
    const base64_encryptText = base64.encode(JSON.stringify(encryptText));
    const path =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath + `/${fileName}.keystore`
        : RNFS.DownloadDirectoryPath + `/${fileName}.keystore`;

    console.log('path: ', path);
    try {
      console.log('1');
      await RNFS.writeFile(path, base64_encryptText, 'utf8');
      console.log('2');
      const options = {
        url: Platform.OS === 'android' ? 'file://' + path : path,
        saveToFiles: true,
      };
      console.log('3');

      if (Platform.OS === 'ios') {
        console.log('os');
        const save = await Share.open(options);

        if (save?.success === true) {
          navigation.replace('BottomNavigation');
          toastShowTop('success', '성공적으로 백업 되었습니다.');
        }
      } else {
        navigation.replace('BottomNavigation');
        toastShowTop('success', 'Download 폴더에 백업 되었습니다.');
      }
    } catch (e) {
      console.log(e);
      // toastShowTop('error', '알 수 없는 에러로 저장이 실패 하였습니다.');
    }
  };

  return (
    <S.Container>
      <Sv col jsb f={1}>
        <Sv>
          {status === 0 && (
            <AccountInfoLayout name={fileName} setName={setFileName} />
          )}
          {status === 1 && (
            <AccountPasswordLayout
              password={password}
              setPassword={setPassword}
              password2={password2}
              setPassword2={setPassword2}
              passwordStatus={passwordStatus}
            />
          )}
          {status === 2 && <AccountBackupCompleteLayout />}
          {/* <InputM title="백업 파일명" /> */}
        </Sv>
        <Sv px={22} pb={16}>
          {status < 2 ? (
            <ButtonL title="비밀번호 설정하기" onPress={onPressNextButton} />
          ) : (
            <ButtonL title="파일 저장하기" onPress={saveFile} />
          )}
        </Sv>
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
