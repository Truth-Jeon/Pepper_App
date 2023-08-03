import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {useNavigation} from '@react-navigation/native';

import {ButtonL, Sv} from 'components/index';

export const PayBtn = ({account, balance, selectedTab, tag}) => {
  const navigation = useNavigation();

  const goConfirmScreen = () => {
    console.log('Tag :', tag);
    navigation.navigate('PayInputPriceScreen', {
      account,
      balance,
      tag,
      transaction_type: 'trans',
      bankCode: '000',
    });
  };

  return (
    <Sv mx={22} mb={22}>
      {selectedTab !== 1 && (
        <ButtonL
          disabled={account.length === 0}
          title="다음"
          onPress={goConfirmScreen}
        />
      )}
    </Sv>
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
