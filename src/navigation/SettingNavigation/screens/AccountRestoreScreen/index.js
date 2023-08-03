import {
  ButtonL,
  HeaderL,
  InputM,
  SingleLineList,
  St,
  Sv,
} from 'components/index';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
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
import {set} from 'lodash';

const RSA_KEYTAG = '1i!8d!fd038dxyq(p58_8gvv=dezp@myj&gqkz#=+2udo$r_m)';

const decryptData = (encryptedData, key) =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');

const generateKey = (password, salt, cost, length) =>
  Aes.pbkdf2(password, salt, cost, length);

export const AccountRestoreScreen = ({navigation, route}) => {
  const [status, setStatus] = useState(0);
  const [password, setPassword] = useState('');
  const [private_key, set_private_key] = useState('');
  const file_uri = route.params.file_uri;

  const restore = async () => {
    console.log('File url :', file_uri);
    const file = await RNFS.readFile(file_uri, 'ascii');
    const base64_decryptText = base64.decode(file);
    const {cipher, iv} = JSON.parse(base64_decryptText);
    const key = await generateKey(password, RSA_KEYTAG, 5000, 256);
    try {
      const decryptText = await decryptData({cipher, iv}, key);
      set_private_key(decryptText);
      setStatus(1);
    } catch (e) {
      toastShowTop('error', '비밀번호가 일치하지 않습니다.');
      setPassword('');
    }
  };

  return (
    <S.Container>
      <Sv col jsb f={1}>
        <Sv>
          {status === 0 && (
            <AccountPasswordLayout
              password={password}
              setPassword={setPassword}
            />
          )}
          {status === 1 && <AccountBackupCompleteLayout />}
        </Sv>
        <Sv px={22} pb={16}>
          {status < 1 ? (
            <ButtonL title="복원하기" onPress={restore} />
          ) : (
            <ButtonL
              title="로그인"
              onPress={() => {
                navigation.navigate('LoginPasswordScreen', {
                  private_key: private_key,
                });
              }}
            />
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
