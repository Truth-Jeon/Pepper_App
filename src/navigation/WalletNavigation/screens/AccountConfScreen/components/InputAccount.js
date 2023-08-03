/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import Clipboard from '@react-native-clipboard/clipboard';

//components
import {
  ButtonL,
  SingleLineList,
  St,
  Sv,
  InputL,
  HeaderL,
} from 'components/index';
import {toastShowBottom} from 'helper/toastHelper';

export const InputAccount = ({chargePoint}) => {
  const [account, setAccount] = useState('37191002830204');

  const copyToClipboard = ({}) => {
    Clipboard.setString(account);
    toastShowBottom('success', '클립보드에 복사되었어요.');
  };

  return (
    <Sv mx={22}>
      <St c2 g3>
        {'은행명'}
      </St>
      <InputL
        placeholder="KEB하나은행"
        value={'KEB하나은행'}
        editable={false}
      />
      <St mt={'22'} c2 g3>
        {'예금주'}
      </St>
      <InputL placeholder="페퍼" value={'주식회사 가보드림'} editable={false} />
      <St mt={'22'} c2 g3>
        {'계좌번호'}
      </St>
      <Sv row act>
        <Sv f={1}>
          <InputL placeholder={account} value={account} editable={false} />
        </Sv>
        <Sv
          as={TouchableOpacity}
          style={{
            backgroundColor: '#F1F3F8',
            padding: n(8),
            borderRadius: 8,
          }}
          act
          jct
          ml={12}
          onPress={copyToClipboard}>
          <Text style={{color: '#76808B', fotSize: 24}}>복사하기</Text>
        </Sv>
      </Sv>

      <St mt={'22'} c2 g3>
        {'충전금액'}
      </St>
      <InputL
        placeholder={`${parseInt(chargePoint, 10).toLocaleString()}원`}
        value={`${parseInt(chargePoint, 10).toLocaleString()}원`}
        numberType
        editable={false}
      />
      <St mt={'22'} c2 g3>
        {'만료일'}
      </St>
      <InputL placeholder="1시간 남음" value={'1시간 남음'} editable={false} />
    </Sv>
  );
};

const S = {};
