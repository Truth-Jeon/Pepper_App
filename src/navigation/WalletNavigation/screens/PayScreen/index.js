import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, ScrollView, Pressable} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';

//components
import {Sv} from 'components/index';
import {PayHeader} from './components/PayHeader';
import {PayAccountSection} from './components/PayAccountSection';
import {PayBtn} from './components/PayBtn';

import {getRequest} from 'apis/common';

export const PayScreen = ({route}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [account, setAccount] = useState('');
  const [tag, setTag] = useState('');
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);

  const [balance, setBalance] = useState(0);

  const getUserBalance = async () => {
    try {
      const result = await getRequest('/v1/account/');
      setBalance(result?.balance);
    } catch (e) {}
  };

  useEffect(() => {
    getUserBalance();
  }, []);

  useEffect(() => {
    if (route?.params?.account) {
      setAccount(route?.params?.account);
    }
  }, [route?.params?.account]);

  return (
    <S.Container>
      <ScrollView>
        <PayHeader
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          balance={balance}
        />
        {/* <Sv f={1} style={{height: '100%'}}> */}
        <PayAccountSection
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          account={account}
          setAccount={setAccount}
          balance={balance}
          tag={tag}
          isBankModalVisible={isBankModalVisible}
          setIsBankModalVisible={setIsBankModalVisible}
          setTag={setTag}
        />
        {/* </Sv> */}

        {/* </KeyboardAvoidingView> */}
      </ScrollView>
      <S.ButtonContainer>
        <PayBtn
          account={account}
          tag={tag}
          balance={balance}
          selectedTab={selectedTab}
        />
      </S.ButtonContainer>
      {isBankModalVisible && (
        <S.ModalOverlay
          as={Pressable}
          onPress={() => {
            setIsBankModalVisible(false);
          }}
        />
      )}
    </S.Container>
  );
};

const S = {};

S.Container = styled.View`
  background-color: white;
  flex: 1;
  height: 100%;
`;

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.ButtonContainer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0;
  left: 0;
`;

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
