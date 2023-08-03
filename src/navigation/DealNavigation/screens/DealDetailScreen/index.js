import {ButtonL, HeaderWhiteM, St, Sv} from 'components/index';
import n from 'helper/normalize';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getStatusBarHeight} from 'react-native-safearea-height';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import React, {useState, useEffect, useCallback} from 'react';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putFormRequest,
  putRequest,
} from 'apis/common';
import moment from 'moment';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {toastShowTop} from 'helper/toastHelper';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import IcBackWhite from 'images/svg/ic-back-white.svg';
import dummy from 'images/png/img-logo.png';

export const DealDetailScreen = ({navigation, route}) => {
  const {account} = useSelector(state => state);
  const [marketItem, setMarketItem] = useState();
  const [isMyItem, setIsMyItem] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressDeleteItem = () => {
    Alert.alert('삭제하기', '정말로 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: '확인', onPress: () => deleteItem()},
    ]);
  };

  const onPressDealComplete = () => {
    Alert.alert('거래완료', '거래를 완료하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: '확인', onPress: () => postDealComplete()},
    ]);
  };

  const onPressRequest = () => {
    if (account?.quick_address.length == 0)
      return toastShowTop('error', '먼저 간편주소를 생성해주세요.');
    if (isMyItem) {
      if (marketItem?.market_request_item) {
        navigation.navigate('DealChatScreen', {
          uuid: marketItem.market_request_item.uuid,
        });
      } else {
        //수정하면 됨
        navigation.navigate('DealCreateScreen', {
          uuid: marketItem.uuid,
          isModify: true,
          goodsItem: marketItem?.title,
          goodsPrice: marketItem?.price,
          goodsLink: marketItem?.kakao_link,
          category: marketItem?.category.id,
          images: marketItem?.images,
          explan: marketItem?.description,
        });
      }
    } else {
      postRequestMarketItemBuy();
    }
  };

  const getButtonDisabled = () => {
    if (marketItem?.sold_status == '300') {
      return true;
    }
    if (isMyItem) {
      return false;
    } else {
      return marketItem?.sold_simple_status != '100';
    }
  };

  const deleteItem = async () => {
    try {
      const result = await deleteRequest(`/v1/market/${marketItem.uuid}/`);
      console.log('삭제', result);
      toastShowTop('success', '삭제가 완료되었습니다.');
      navigation.goBack();
    } catch (e) {}
  };

  const postDealComplete = async () => {
    try {
      const formData = new FormData();
      formData.append('sold_status', 300);
      const result = await putFormRequest(
        `/v1/market/${marketItem.uuid}/`,
        formData,
      );
      console.log('거래완료 ', result);
      getMarketItem();
    } catch (e) {
      console.log('거래완료 에러', e);
    }
  };

  const getMarketItem = async () => {
    try {
      const result = await getRequest(`v1/market/${route.params?.uuid}/`);
      console.log('마켓 아이템 상세', result);
      if (result?.account.public_address == account?.public_address) {
        setIsMyItem(true);
      }
      setMarketItem(result);
    } catch (e) {
      console.log(e);
    }
  };

  const postRequestMarketItemBuy = async () => {
    try {
      const result = await postRequest(
        `v1/market/request/${route.params?.uuid}/`,
      );
      console.log(result);
      goDealChattingScreen(result.result.uuid);
    } catch (e) {
      if (e.response?.data?.message)
        toastShowTop('success', e.response?.data?.message);
    }
  };

  const goDealChattingScreen = uuid => {
    navigation.navigate('DealChatScreen', {
      uuid: uuid,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getMarketItem();
    }, []),
  );

  useEffect(() => {
    const backAction = () => {
      if (selectedImageIndex == -1) {
        return false;
      } else {
        setSelectedImageIndex(-1);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedImageIndex]);

  return (
    <S.Container>
      <S.HeaderContainer>
        <HeaderWhiteM
          onPressMore={() => setIsModalVisible(true)}
          hasRight={isMyItem}
        />
      </S.HeaderContainer>
      <ScrollView>
        <S.ImageContainer>
          {marketItem ? (
            marketItem.images?.length > 0 ? (
              <Carousel
                data={marketItem?.images}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                decelerationRate={2}
                renderItem={({item, index}) => (
                  <Pressable onPress={() => setSelectedImageIndex(index)}>
                    <Image
                      style={{width: '100%', height: n(282)}}
                      source={{uri: item.image}}
                    />
                  </Pressable>
                )}
              />
            ) : (
              <Image style={{width: '100%', height: n(282)}} source={dummy} />
            )
          ) : null}
        </S.ImageContainer>
        <Sv row py={18} px={18}>
          {/* <S.ProfileImage /> */}
          <Sv col jsb>
            <St s2 g1>
              {marketItem?.title}
            </St>
            <St c1 g3 mt={4}>
              {marketItem?.category.name} •{' '}
              {moment(marketItem?.created_at).format('YYYY-MM-DD')}
            </St>
          </Sv>
        </Sv>
        <Sv w={'100%'} h={1} bg={colors.g6} />
        <Sv py={16} px={18}>
          {/* <St s1 g0 mb={10}>
            {marketItem?.title}
          </St>
          <St c1 g3 mb={20}>
            {marketItem?.category.name} •{' '}
            {moment(marketItem?.created_at).format('YYYY-MM-DD')}
          </St> */}
          <St b2 g0>
            {marketItem?.description}
          </St>
        </Sv>
      </ScrollView>
      <Sv as={S.ButtonContainer} row w={'100%'} act jsb pt={18} pb={40} px={18}>
        <St s1 g0>
          {marketItem?.price.toLocaleString()}원
        </St>
        <Sv row>
          {isMyItem && marketItem?.sold_status != '300' && (
            <ButtonL
              onPress={onPressDealComplete}
              fillGray
              title="거래완료"
              px={8}
            />
          )}
          <Sv w={8} />
          <ButtonL
            disabled={getButtonDisabled()}
            onPress={onPressRequest}
            title={
              isMyItem
                ? marketItem?.sold_status == '300'
                  ? '거래완료'
                  : marketItem?.market_request_item
                  ? '채팅하기'
                  : '수정하기'
                : marketItem?.sold_simple_status == '100'
                ? '구매 요청 하기'
                : marketItem?.sold_simple_status == '200'
                ? '거래 중'
                : '거래 완료'
            }
            px={8}
          />
        </Sv>
      </Sv>
      {selectedImageIndex != -1 && (
        <S.ImagePopup>
          <ImageViewer
            index={selectedImageIndex}
            enableSwipeDown
            onSwipeDown={() => setSelectedImageIndex(-1)}
            renderHeader={() => (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: getStatusBarHeight(),
                  zIndex: 100,
                }}
                onPress={() => setSelectedImageIndex(-1)}>
                <IcBackWhite />
              </TouchableOpacity>
            )}
            imageUrls={marketItem?.images.map(e => {
              return {url: e.image};
            })}
          />
        </S.ImagePopup>
      )}
      <ModalSlide
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        renderComponent={
          <Sv>
            <St s3 g2>
              더보기
            </St>
            <Sv my={12} h={1} w="100%" bg={colors.g6} />
            <TouchableOpacity onPress={onPressDeleteItem}>
              <St s3 red>
                삭제
              </St>
            </TouchableOpacity>
          </Sv>
        }
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled.View`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
`;

S.ImageContainer = styled.View`
  width: 100%;
  height: ${n(282)}px;
  background-color: ${colors.g6};
`;

S.ProfileImage = styled(Image)`
  width: ${n(43)}px;
  height: ${n(43)}px;
  border-radius: ${n(43)}px;
  background-color: ${colors.g6};
`;

S.ButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.g6};
`;

S.HeaderContainer = styled.View`
  position: absolute;
  top: ${Platform.OS == 'ios' ? getStatusBarHeight() : n(0)}px;
  left: 0;
  right: 0;
  z-index: 2;
`;

S.ImagePopup = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  z-index: 2;
`;
