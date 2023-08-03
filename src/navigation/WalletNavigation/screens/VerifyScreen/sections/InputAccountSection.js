import {postRequest} from 'apis/common';
import {BankSlide, ButtonL, HeaderL, InputL, Sv} from 'components/index';
import {toastShowTop} from 'helper/toastHelper';
import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import n from 'helper/normalize';

import DropDownPicker from 'react-native-dropdown-picker';

const {StatusBarManager} = NativeModules;

export const InputAccountSection = ({
  open,
  setOpen,
  value,
  setValue,
  items,
  setItems,
  setSelectedSection,
  accountNumber,
  setAccountNumber,
  setCertificationId,
  isBankModalVisible,
  setIsBankModalVisible,
}) => {
  const [loading, setLoading] = useState(false);
  const accountRegex = /(\d{1,})(-(\d{1,})){1,}/g;

  const postRequestVerifyAccount = async () => {
    try {
      const result = await postRequest('/v1/account/bank/certification/', {
        bank_code: value.value,
        account_number: accountNumber,
      });
      console.log(result);
      setCertificationId(result.id);
      setSelectedSection(1);
    } catch (e) {
      toastShowTop('error', '계좌번호를 확인해주세요.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const goVerifyAccountSection = () => {
    if (loading) return;
    setLoading(true);
    console.log(value);
    if (value === null) {
      toastShowTop('error', '은행을 선택해주세요.');
      return;
    }
    if (accountNumber.length == 0) {
      toastShowTop('error', '계좌번호를 입력해주세요.');
      return;
    }
    postRequestVerifyAccount();
  };

  useEffect(() => {
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    <Pressable style={{flex: 1}} onPressIn={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}
        keyboardVerticalOffset={statusBarHeight + 22}>
        <HeaderL title={`계좌 인증을 위해\n본인 명의의 계좌를 입력해주세요.`} />
        <Sv mx={20} col jsb f={1}>
          <Sv>
            <ButtonL
              title={value ? value.label : '은행을 선택해 주세요'}
              grayLine
              onPress={() => setIsBankModalVisible(true)}
            />
            <BankSlide
              isVisible={isBankModalVisible}
              setIsVisible={setIsBankModalVisible}
              setValue={setValue}
            />

            <Sv h={30} />
            <InputL
              placeholder="계좌번호"
              value={accountNumber}
              numberType
              returnKeyType="done"
              onChangeText={t => setAccountNumber(t)}
            />
          </Sv>
          <Sv mb={16}>
            <ButtonL
              title="인증하기"
              disabled={loading}
              onPress={() => {
                goVerifyAccountSection();
              }}
            />
          </Sv>
        </Sv>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const S = {};

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
