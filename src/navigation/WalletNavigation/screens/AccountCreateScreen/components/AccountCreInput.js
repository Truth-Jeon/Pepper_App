import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, Button} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';

export const AccountCreInput = ({
  quickAccount,
  setQuickAccount,
  onPressButton,
}) => {
  return (
    <Sv mx={22}>
      <InputL
        value={quickAccount}
        onChangeText={setQuickAccount}
        placeholder="영문, 숫자3~10자"
        maxLength={10}
        hasButton
        buttonText="중복확인"
        onPressButton={onPressButton}
      />
    </Sv>
  );
};

const S = {};
