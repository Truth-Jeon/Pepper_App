import {FAB} from 'components/Button/FAB';
import {ChoiceHeader} from 'components/Header/ChoiceHeader';
import React, {useCallback, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {DealMyHistoryLayout} from './layouts/DealMyHistoryLayout/index';
import {DealShopLayout} from './layouts/DealShopLayout/index';
import IcPlus from 'images/svg/ic-plus.svg';
import {DealRequestLayout} from './layouts/DealRequestLayout/index';
import {useSelector} from 'react-redux';
import {toastShowTop} from 'helper/toastHelper';
import {St, Sv} from 'components/index';
import LogoPepper from 'images/svg/logo-pepper.svg';
import {useFocusEffect} from '@react-navigation/native';
import {getRequest} from 'apis/common';
import {CreateAccountGuide} from './components/CreateAccountGuide';
const DEAL_HEADER_TEXT = ['장터', '구매목록', 'MY'];

export const DealScreen = ({navigation}) => {
  const [selectedHeader, setSelectedHeader] = React.useState(0);
  const [requestCount, setRequestCount] = React.useState(false);
  const [myCount, setMyCount] = React.useState(false);
  const {isAuth} = useSelector(state => state.account);

  const {account} = useSelector(state => state);

  const goDealCreateScreen = () => {
    if (account?.quick_address.length === 0) {
      return toastShowTop('error', '먼저 간편주소를 생성해주세요.');
    }

    navigation.navigate('DealCreateScreen');
  };

  const getRequestCount = async () => {
    try {
      if (!isAuth) return;
      const result = await getRequest('/v1/market/request/count/');
      setRequestCount(result?.result);
    } catch (e) {
      console.log('count error', e);
    }
  };

  const getMyCount = async () => {
    try {
      if (!isAuth) return;
      const result = await getRequest('/v1/market/my/count/');
      setMyCount(result.result);
    } catch (e) {}
  };

  useEffect(() => {
    getRequestCount();
    getMyCount();
    const instance = setInterval(() => {
      getRequestCount();
      getMyCount();
    }, 5000);
    return () => {
      clearInterval(instance);
    };
  }, []);

  const AuthRender = () => {
    switch (selectedHeader) {
      case 0:
        return <DealShopLayout />;
      case 1:
        return <DealRequestLayout itemCount={requestCount} />;
      case 2:
        return <DealMyHistoryLayout itemCount={myCount} />;
    }
  };
  return (
    <S.Container auth={isAuth}>
      <Sv ml={22} mt={20}>
        <LogoPepper />
      </Sv>
      <ChoiceHeader
        items={DEAL_HEADER_TEXT}
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
        requestTotalCount={requestCount?.total_count}
        myTotalCount={myCount?.total_count}
      />
      {isAuth ? (
        <>
          {/* <AuthRender /> */}
          {selectedHeader == 0 && <DealShopLayout />}
          {selectedHeader == 1 && (
            <DealRequestLayout itemCount={requestCount} />
          )}
          {selectedHeader == 2 && <DealMyHistoryLayout itemCount={myCount} />}
          <S.FabContainer>
            <FAB onPress={goDealCreateScreen} icon={<IcPlus />} />
          </S.FabContainer>
        </>
      ) : (
        <Sv>
          <CreateAccountGuide />
        </Sv>
      )}
    </S.Container>
  );
};
const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => (props.auth ? '#FFF' : '#f2f3f5')}; ;
`;

S.FabContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
