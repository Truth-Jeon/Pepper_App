import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import styled from 'styled-components';

//components
import {St, Sv} from 'components/index';
import {PayconfirmSection} from './components/PayconfirmSection';
import {PayConfHeader} from './components/PayConfHeader';
import {PayConfBtn} from './components/PayConfBtn';

//images

import {postRequest} from 'apis/common';
import {toastShowTop} from 'helper/toastHelper';
import {useSelector} from 'react-redux';
import {PayPasswordModal} from './components/PayPasswordModal';

export const PayConfirmScreen = ({navigation, route}) => {
  const [password, setPassword] = useState([-1, -1, -1, -1, -1, -1]);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const {balance} = useSelector(state => state.account);
  const transaction_type = route.params?.transaction_type;
  const isMarket = route.params?.isMarket || false;
  const bank_code = route.params?.bank_code;
  const tag = route.params?.tag;

  const isWithdraw = route.params?.transaction_type === 'withdraw';

  const title =
    transaction_type === 'trans' || isMarket === true ? '송금' : '출금';

  const goBackPayScreen = () => {
    if (route.params?.isMarket) {
      navigation.goBack();
    } else {
      navigation.navigate('PayScreen');
    }
  };

  const goAlert = () => {
    Alert.alert(
      '송금오류',
      '최소 1,000원부터 송금하실 수 있습니다',
      [
        {
          text: '확인',
          // onPress: () => navigation.navigate('CommisionPayScreen'),
        },
      ],
      {cancelable: false},
    );
  };

  const onSucessPassword = async () => {
    setIsPasswordModalOpen(false);
    const sendPrice = route.params?.price.toString().replace(/,/g, '');
    console.log('sendPrice : ', sendPrice);
    if (sendPrice < 1000) {
      goAlert();
    } else {
      if (route.params?.isMarket) {
        console.log('마켓 송금');
        await postTransactionMarket();
      } else {
        // 송금
        console.log('transaction_type');
        if (transaction_type === 'trans') {
          console.log('transaction_type trans');
          await postTransaction();
        } // 출금
        else {
          await postTransactionWithdraw();
        }
      }
    }
  };

  const onPressTransaction = () => {
    setIsPasswordModalOpen(true);
  };

  const postTransactionWithdraw = async () => {
    console.log('bank_code :', bank_code);

    try {
      const sendPrice = route.params?.price;
      const sendAccount = route.params?.account;

      const sendData = {
        account_number: sendAccount,
        point: sendPrice,
        bank_code: bank_code,
      };

      console.log('sendData : ', sendData);

      await postRequest('/v1/account/transaction/withdraw/', sendData);

      navigation.navigate('PayCompleteScreen', {
        isMarket: false,
        title: title,
      });
      toastShowTop('success', '출금이 완료되었습니다');
    } catch (e) {
      clearPassword();
      toastShowTop('error', e.response?.data?.message);
      console.log(e);
    }
  };

  const postTransaction = async () => {
    try {
      const sendPrice = route.params?.price;
      const sendAccount = route.params?.account;

      const sendData = {
        quick_address: sendAccount,
        point: sendPrice,
        ...(tag && {tag: tag}),
      };

      await postRequest('/v1/account/transaction/', sendData);

      navigation.navigate('PayCompleteScreen', {
        isMarket: false,
        title: title,
      });
      // toastShowTop('success', '송금이 완료되었습니다');
    } catch (e) {
      clearPassword();
      toastShowTop('error', e.response?.data?.message);
      console.log(e.response?.data);
    }
  };

  const postTransactionMarket = async () => {
    try {
      const sendPrice = route.params?.price;
      const sendAccount = route.params?.account;

      const sendData = {
        quick_address: sendAccount,
        point: sendPrice,
        market_request_uuid: route.params?.requestUuid,
      };
      console.log('sendData : ', sendData);
      await postRequest('/v1/account/transaction/market/', sendData);
      navigation.navigate('PayCompleteScreen', {
        isMarket: true,
      });
    } catch (e) {
      console.log(e);
      toastShowTop('error', e.response?.data?.message);
      clearPassword();
      console.log(e.response?.data);
    }
  };

  const clearPassword = () => {
    setPassword([-1, -1, -1, -1, -1, -1]);
  };

  return (
    <S.Container>
      <PayConfHeader account={route.params?.account} title={title} />
      <Sv jsb col f={1} as={Pressable} onPress={() => Keyboard.dismiss()}>
        <Sv>
          <PayconfirmSection price={route.params?.price} />
        </Sv>
        <Sv
          as={KeyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Sv mx={22} mt={12}>
            <St h4>{'보유 금액'}</St>
            <St g3>{balance.toLocaleString()}원</St>
          </Sv>
          <Sv mx={22} mt={12}>
            <St h4>{`${title} 후 잔액`}</St>
            <St g3>
              {route.params?.transaction_type === 'withdraw'
                ? (
                    balance -
                    (parseInt(route.params?.price, 10) + 1000)
                  ).toLocaleString()
                : (
                    balance - parseInt(route.params?.price, 10)
                  ).toLocaleString()}
              원
              {route.params?.transaction_type === 'withdraw' &&
                '(수수료 1,000원)'}
            </St>
          </Sv>
          <PayConfBtn
            title={title}
            onPressTransaction={onPressTransaction}
            goBackPayScreen={goBackPayScreen}
          />
        </Sv>
      </Sv>
      <PayPasswordModal
        isVisible={isPasswordModalOpen}
        setIsVisible={setIsPasswordModalOpen}
        onSucess={onSucessPassword}
        password={password}
        setPassword={setPassword}
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;
