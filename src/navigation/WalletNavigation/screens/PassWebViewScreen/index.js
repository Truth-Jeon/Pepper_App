import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components';
import {colors} from 'styles/colors';
// import {putFormRequest} from 'apis/common';
import {useDispatch} from 'react-redux';
import {setPhoneVerify} from 'store/reducer/phoneVerifyReducer';
import {postRequest} from 'apis/common';

export const PassWebViewScreen = ({navigation}) => {
  const [webUrl, setUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const putUser = async (phone, name, birthdate) => {
    dispatch(setPhoneVerify({phone, name, birthdate}));
    navigation.goBack();
  };

  const _getNice = async () => {
    try {
      const response = await axios({
        url: 'https://nice.pepper.ne.kr/checkplus_main',
        method: 'GET',
      });
      console.log('NICE :', response.data);
      var url = 'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      console.log(
        `${url}?m=checkplusService&EncodeData=${response.data.sEncData}`,
      );
      setUrl(`${url}?m=checkplusService&EncodeData=${response.data.sEncData}`);
    } catch (e) {}
  };

  useEffect(() => {
    _getNice();
  }, []);

  const handleWebViewMessage = async event => {
    setIsLoading(true);
    const responseData = JSON.parse(event.nativeEvent.data);
    console.log('responseData :', responseData);
    const mobileno = responseData.mobileno;
    const name = responseData.name;
    const birthdate = responseData.birthdate;

    if (typeof mobileno === 'string' && mobileno.length > 0) {
      try {
        await postRequest('/v1/account/verify/phone-check/', {
          phone: mobileno,
        });

        Alert.alert(
          '이미 간편주소가 존재합니다.',
          '이미 같은 번호로 간편주소가 생성되어 있습니다. 기존 간편주소로 로그인해주세요.',
          [
            {
              text: '확인',
              onPress: () => {
                setIsLoading(false);
                navigation.goBack();
              },
            },
          ],
          {
            cancelable: false,
          },
        );
      } catch (e) {
        if (
          e.response.status === 404 &&
          e.response.data.message === '해당 계정이 존재하지 않습니다.'
        ) {
          putUser(mobileno, name, birthdate);
        }
      }
    } else {
      Alert.alert(
        '본인인증 오류',
        `핸드폰 번호가 유효하지 않습니다.${'\n'}잠시 후에 다시 시도해주세요.`,
        [
          {
            text: '확인',
            onPress: () => {
              setIsLoading(false);
              navigation.goBack();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </S.LoadingContainer>
    );
  }

  return (
    <S.WebViewContainer>
      {webUrl && (
        <WebView
          source={{
            uri: webUrl,
          }}
          javaScriptEnabled={true}
          originWhitelist={['*']}
          onMessage={handleWebViewMessage}
        />
      )}
    </S.WebViewContainer>
  );
};

const S = {};

S.WebViewContainer = styled.SafeAreaView`
  flex: 1;
`;

S.LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
