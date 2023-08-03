import {getRequest, postRequest} from 'apis/common';
import {ButtonL, HeaderM, SpeechBubble, St, Sv} from 'components/index';
import n from 'helper/normalize';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {useFocusEffect} from '@react-navigation/native';
import {toastShowTop} from 'helper/toastHelper';
import {useSelector} from 'react-redux';
import dummy from 'images/png/img-logo.png';

const BUTTON_TEXT = {
  100: {
    seller: {title: '거래요청 수락하기', disabled: false},
    buyer: {title: '거래요청 수락 대기중', disabled: true},
  },
  200: {
    seller: {title: '입금 대기중', disabled: true},
    buyer: {title: '입금 대기중', disabled: true},
  },
  210: {
    seller: {title: '배송정보 입력하기', disabled: false},
    buyer: {title: '배송정보 입력 대기중', disabled: true},
  },
  220: {
    seller: {title: '구매확정 대기중', disabled: true},
    buyer: {title: '구매확정 하기', disabled: false},
  },
  300: {
    seller: {title: '거래가 완료되었습니다.', disabled: true},
    buyer: {title: '거래가 완료되었습니다.', disabled: true},
  },
};

export const DealChatScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState(
    Platform.OS == 'ios' ? 'seller' : 'buyer',
  );
  const [marketItem, setMarketItem] = useState();
  const [requestItem, setRequestItem] = useState();

  const [loadingButton, setLoadingButton] = useState(false);

  const {account} = useSelector(state => state);

  const getMarketChatHistory = async () => {
    try {
      const result = await getRequest(
        `/v1/market/chat-history/${requestItem?.uuid}/`,
      );
      // console.log('마켓 채팅 결과', result.result?.messages);
      setMessages(result.result?.messages);
    } catch (e) {
      console.log('마켓 채팅', e);
    }
  };

  const getMarketRequestItem = async () => {
    try {
      console.log('유유', route.params?.uuid);
      const result = await getRequest(
        `/v1/market/request/${route.params?.uuid}/`,
      );
      console.log('마켓 요청 아이템', result.result);
      if (result.result.item.account.public_address == account.public_address) {
        setUserType('seller');
      } else {
        setUserType('buyer');
      }
      setRequestItem(result.result);
      setMarketItem(result.result.item);
    } catch (e) {
      console.log(e);
    }
  };

  const postAcceptMarketRequest = async () => {
    try {
      const result = await postRequest(
        `/v1/market/request/${requestItem?.uuid}/accept/`,
      );
      console.log(result);
      getMarketRequestItem();
      getMarketChatHistory();
    } catch (e) {
      console.log(e);
    }
  };

  const postSendMarketRequest = async () => {
    try {
      const result = await postRequest(
        `/v1/market/request/${requestItem?.uuid}/send/`,
      );
      console.log(result);
      getMarketRequestItem();
      getMarketChatHistory();
    } catch (e) {
      console.log(e);
    }
  };

  const postCompleteMarketRequest = async () => {
    try {
      const result = await postRequest(
        `/v1/market/request/${requestItem?.uuid}/complete/`,
      );
      console.log(result);
      getMarketRequestItem();
      getMarketChatHistory();
    } catch (e) {
      console.log(e);
      toastShowTop('error', '오류가 발생했습니다.');
    }
  };

  const postSendMoney = async () => {
    if (account.balance < requestItem?.price) {
      toastShowTop('error', '잔액이 부족합니다.');
    } else {
      navigation.navigate('PayConfirmScreen', {
        account:
          userType === 'seller'
            ? requestItem?.account.quick_address
            : marketItem?.account.quick_address,
        price: marketItem?.price,
        isMarket: true,
        requestUuid: requestItem?.uuid,
      });
    }
  };

  const postGoMarketItemNextStep = async () => {
    try {
      const result = await postRequest(
        `/v1/market/${marketItem.uuid}/sold-status/`,
      );
      console.log(result);
      getMarketRequestItem();
    } catch (e) {
      console.log(e);
    }
  };

  const onPressButton = async () => {
    setLoadingButton(true);
    if (userType == 'seller') {
      switch (marketItem.sold_status) {
        case 100:
          await postAcceptMarketRequest();
          break;
        case 210:
          goDealInputShipScreen();
          break;
      }
    } else {
      switch (marketItem.sold_status) {
        case 220:
          await postCompleteMarketRequest();
          break;
      }
    }
    setLoadingButton(false);
  };

  const goDealInputShipScreen = () => {
    navigation.navigate('DealInputShipScreen', {uuid: requestItem.uuid});
  };

  useFocusEffect(
    useCallback(() => {
      getMarketRequestItem();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (requestItem) getMarketChatHistory();
    }, [requestItem]),
  );

  return (
    <S.Container>
      <HeaderM
        title={`${
          userType == 'seller'
            ? requestItem?.account.quick_address
            : marketItem?.account.quick_address
        }`}
      />
      <Sv w={'100%'} h={1} bg={colors.g6} />
      <Sv col py={14} px={16}>
        <Sv row>
          <Sv>
            <S.ProfileImage
              source={
                marketItem?.images[0]?.image
                  ? {uri: marketItem.images[0].image ?? null}
                  : dummy
              }
            />
          </Sv>
          <Sv col jsb ml={8}>
            <St c2 g2>
              {marketItem?.title}
            </St>
            <St s3 g0>
              {marketItem?.price.toLocaleString()}원
            </St>
          </Sv>
        </Sv>
        <Sv row mt={14}>
          {!requestItem?.is_refused && (
            <S.ButtonContainer
              as={TouchableOpacity}
              onPress={() => Linking.openURL(marketItem?.kakao_link)}>
              <St s3 g3>
                연락하기
              </St>
            </S.ButtonContainer>
          )}
          {marketItem?.sold_status == 200 &&
            userType == 'buyer' &&
            !requestItem?.is_refused && (
              <S.ButtonContainer as={TouchableOpacity} onPress={postSendMoney}>
                <St s3 g3>
                  송금하기
                </St>
              </S.ButtonContainer>
            )}
        </Sv>
      </Sv>
      <Sv w={'100%'} h={1} bg={colors.g6} />
      <FlatList
        ListHeaderComponent={<Sv h={16} />}
        style={{flex: 1}}
        data={messages}
        renderItem={({item, index}) => (
          <SpeechBubble
            right={item.account.public_address == account.public_address}
            body={item.message}
            time={item.created_at}
          />
        )}
      />
      <Sv px={18} pb={16}>
        <ButtonL
          title={
            requestItem?.is_refused
              ? '거래 요청을 거절했어요'
              : BUTTON_TEXT[marketItem?.sold_status ?? 100][userType]?.title
          }
          onPress={onPressButton}
          disabled={
            BUTTON_TEXT[marketItem?.sold_status ?? 100][userType].disabled ||
            requestItem?.is_refused ||
            loadingButton
          }
        />
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.ProfileImage = styled(Image)`
  width: ${n(40)}px;
  height: ${n(40)}px;
  background-color: ${colors.g5};
  border-radius: 8px;
`;

S.ButtonContainer = styled.View`
  border-radius: 8px;
  border: 1px solid ${colors.g5};
  padding: ${n(6)}px ${n(12)}px;
  margin-right: ${n(6)}px;
`;
