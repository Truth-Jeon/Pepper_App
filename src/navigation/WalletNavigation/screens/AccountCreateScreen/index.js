import React, {useState, useEffect} from 'react';
import {SafeAreaView, Image, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';

import {St, Sv} from 'components/index';
import {AccountCreHeader} from './components/AccountCreHeader';
import {AccountCreInput} from './components/AccountCreInput';
import {AccountCreateTermScreen} from '../AccountCreateTermScreen/index';
import {postRequest} from 'apis/common';
import {toastShowTop} from 'helper/toastHelper';

import {useRoute} from '@react-navigation/native';

export const AccountCreateScreen = ({navigation}) => {
  const route = useRoute();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (route.params !== undefined) {
      setIsVisible(route.params?.isVisible);
    }
  }, [route.params]);

  const [quickAccount, setQuickAccount] = useState('');

  const [isAccountGood, setIsAccountGood] = useState(false);

  const postCheckAccount = async () => {
    const engNum = /^[a-zA-Z0-9]*$/;
    if (!engNum.test(quickAccount)) {
      toastShowTop('error', '영문 및 숫자만 입력 가능합니다.');
      return false;
    }

    if (quickAccount.length < 3 || quickAccount.length > 10) {
      toastShowTop('error', '3~10자리로 입력해주세요.');
      return false;
    }
    try {
      const result = await postRequest('/v1/account/check/', {
        quick_address: quickAccount,
      });

      toastShowTop('error', '중복된 간편주소입니다.');
      setIsAccountGood(false);
    } catch (e) {
      console.log(e);
      toastShowTop('success', '사용가능한 간편주소입니다.');
      setIsAccountGood(true);
    }
  };

  useEffect(() => {
    console.log('quickAccount :', quickAccount);
  }, [quickAccount]);

  return (
    <S.Container>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Sv style={{flex: 1}}>
          <AccountCreHeader />
          <AccountCreInput
            quickAccount={quickAccount}
            setQuickAccount={setQuickAccount}
            onPressButton={postCheckAccount}
          />
          <Sv mx={22}>
            <St b2 g3 mt={16}>
              {
                '은행계좌번호는 입력하지 말아주세요.\n신규로 생성하고 싶은 페퍼 간편주소 번호를 입력해주세요.'
              }
            </St>
          </Sv>
        </Sv>
        <S.ButtonContainer>
          <AccountCreateTermScreen
            quickAccount={quickAccount}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isAccountGood={isAccountGood}
          />
        </S.ButtonContainer>
        {isVisible && <S.ModalOverlay />}
      </KeyboardAvoidingView>
    </S.Container>
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

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

S.ButtonContainer = styled.View`
  position: absolute;
  bottom: ${n(0)}px;
  right: 0;
  left: 0;
`;
