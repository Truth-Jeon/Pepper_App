import {ButtonL, HeaderL, SingleLineList, St, Sv} from 'components/index';
import {InputM} from 'components/Input/InputM';
import {TextareaM} from 'components/Input/TextareaM';
import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  match,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {colors} from 'styles/colors';
import n from 'helper/normalize';
import {
  getRequest,
  postFormRequest,
  postRequest,
  putFormRequest,
  putRequest,
} from 'apis/common';

import IcCamera from 'images/png/img-camera.png';
import IcCancelWhite from 'images/png/img-cancel-white.png';
import imageUploadModule from 'helper/imageUploadModule';
import {Alert} from 'react-native';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {useDispatch} from 'react-redux';
import {setRefreshState} from 'store/reducer/marketReducer';

export const DealCreateScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [marketItems, setMarketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState();

  const [goodsItem, setGoodsItem] = useState('');
  const [goodsPrice, setGoodsPrice] = useState('');
  const [goodsLink, setGoodsLink] = useState('');
  const [category, setCategory] = useState(1);
  const [explan, setExplan] = useState('');

  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const onPressSummit = () => {
    if (isNaN(goodsPrice)) {
      Alert.alert('상품가격을 확인해주세요.', '', [{text: '확인'}]);
    } else {
      if (goodsPrice < 10000) {
        return Alert.alert('상품가격은 최소 10,000원 이상이여야 합니다.', '', [
          {text: '확인'},
        ]);
      }
      onPressCheck();
    }
  };

  const onPressCheck = () => {
    let regex =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regex.test(goodsLink)) {
      if (goodsLink.includes('open.kakao.com/o/')) {
        postMarket();
      } else {
        Alert.alert('카카오 오픈채팅 링크를 입력해주세요.', '', [
          {text: '확인'},
        ]);
      }
    } else {
      Alert.alert('링크를 확인해주세요.', '', [{text: '확인'}]);
    }
  };
  // https://www.google.co.kr/ 테스트 url

  const getCategory = async () => {
    try {
      const result = await getRequest(`/v1/market/category/`);
      console.log('category', result);
      setCategories(result);
      setCategory(result[0]);
    } catch (e) {}
  };

  const postMarket = async () => {
    if (isLoadingPost) return;
    setIsLoadingPost(true);
    try {
      const formData = new FormData();
      formData.append('title', goodsItem);
      formData.append('price', goodsPrice);
      formData.append('description', explan);
      formData.append('category', category.id);
      formData.append('kakao_link', goodsLink);
      if (marketItems.length > 0) {
        for (let data of marketItems) {
          console.log(data, '이미지');
          formData.append('images', data.id);
        }
      }
      if (route.params?.isModify) {
        const result = await putFormRequest(
          `/v1/market/${route.params?.uuid}/`,
          formData,
        );
        console.log('put result', result);
      } else {
        await postFormRequest(`/v1/market/`, formData);
      }
      dispatch(setRefreshState(true));
      navigation.goBack();
    } catch (e) {
      console.log(e.response);
      Alert.alert('상품 정보를 모두 입력해 주세요', '', [{text: '확인'}]);
    } finally {
      setIsLoadingPost(false);
    }
  };

  const postImageUpload = async image => {
    try {
      console.log(image);
      const formData = new FormData();
      formData.append('image', image);
      const result = await postFormRequest(
        '/v1/market/image-upload/',
        formData,
      );
      console.log('image upload result', result);
      return result.result;
    } catch (e) {
      console.log('image upload err', e);
    }
  };

  const onPressCamera = async () => {
    try {
      setLoading(true);
      const newImages = await imageUploadModule(
        true,
        false,
        10,
        marketItems,
        '',
        true,
        600,
        600,
      );
      if (!newImages) {
        setLoading(false);
        return;
      }

      const responseImages = await Promise.all(
        newImages.map(imageObj => postImageUpload(imageObj)),
      );

      // const responseImages = newImages.map(imageObj => ({
      //   url: imageObj.uri,
      //   name: imageObj.name,
      // }));

      // const trimedImages = [];

      // for (const imageObj of responseImages) {
      //   if (imageObj) {
      //     trimedImages.push(imageObj);
      //   }
      // }

      // console.log('image', trimedImages);

      setMarketItems([...marketItems, ...responseImages]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onPressRemoveImage = index => {
    setMarketItems(marketItems.filter((item, _index) => index != _index));
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    console.log('어', categories, route.params?.isModify);
    if (categories && route.params?.isModify) {
      setGoodsItem(route.params?.goodsItem);
      setGoodsPrice(route.params?.goodsPrice.toString());
      setGoodsLink(route.params?.goodsLink);
      setCategory(categories.find(item => item.id === route.params?.category));
      setMarketItems(route.params?.images);
      setExplan(route.params?.explan);
    }
  }, [categories, route.params?.isModify]);

  return (
    <S.Container>
      {loading && (
        <Sv
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 10,
          }}
          w="100%"
          h="100%"
          bg={'rgba(0,0,0,0.2)'}>
          <ActivityIndicator color={colors.primary} />
        </Sv>
      )}
      <HeaderL title={`상품 정보를\n입력해 주세요`} />
      <Sv as={KeyboardAvoidingScrollView} px={22}>
        <InputM
          placeholder="상품 이름"
          maxLength={20}
          value={goodsItem}
          onChangeText={t => setGoodsItem(t)}
        />
        <Sv h={20} />
        <InputM
          placeholder="상품 가격"
          value={goodsPrice}
          maxLength={9}
          onChangeText={t => setGoodsPrice(t)}
          numberType
        />
        <Sv h={20} />
        <InputM
          placeholder="대화용 카카오톡 오픈채팅방 링크"
          value={goodsLink}
          onChangeText={t => setGoodsLink(t)}
        />
        <Sv h={20} />
        <InputM
          placeholder={category?.name}
          value={category?.name}
          asButton
          onPress={() => setIsCategoryModalVisible(true)}
          // onChangeText={t => setCategory(t)}
        />
        <Sv h={20} />
        <TextareaM
          placeholder="상품에 대한 상세한 설명을 적어주세요."
          value={explan}
          onChangeText={t => setExplan(t)}
        />
        <Sv h={20} />
        <ScrollView horizontal={true}>
          <Sv row pt={5}>
            <TouchableOpacity onPress={onPressCamera}>
              <S.CameraContainer>
                <Image source={IcCamera} style={{width: 24, height: 19.71}} />
                <St primary c3 mt={4}>
                  {marketItems.length}/10
                </St>
              </S.CameraContainer>
            </TouchableOpacity>
            {marketItems.map((item, index) => {
              return (
                <TouchableOpacity>
                  <S.UploadImageContainer>
                    <S.CancelContainer
                      as={TouchableOpacity}
                      onPress={() => {
                        onPressRemoveImage(index);
                      }}>
                      <Image
                        style={{width: 5.4, height: 5.4}}
                        source={IcCancelWhite}
                      />
                    </S.CancelContainer>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </S.UploadImageContainer>
                </TouchableOpacity>
              );
            })}
          </Sv>
        </ScrollView>
        <Sv h={20} />
      </Sv>
      <Sv px={18} mb={16}>
        <ButtonL
          disabled={isLoadingPost}
          onPress={onPressSummit}
          title="등록하기"
        />
      </Sv>
      <ModalSlide
        isVisible={isCategoryModalVisible}
        setIsVisible={setIsCategoryModalVisible}
        renderComponent={
          <Sv h={256}>
            <FlatList
              data={categories}
              renderItem={({item, index}) => (
                <SingleLineList
                  onPress={() => {
                    setCategory(item);
                    setIsCategoryModalVisible(false);
                  }}
                  title={item.name}
                />
              )}
            />
          </Sv>
        }
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.CameraContainer = styled.View`
  width: ${n(70)}px;
  height: ${n(70)}px;
  border-radius: ${n(10)}px;
  border: 1px solid ${colors.g5};

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 12px;
`;

S.UploadImageContainer = styled.View`
  width: ${n(70)}px;
  height: ${n(70)}px;
  border-radius: ${n(10)}px;
  border: 1px solid ${colors.g5};

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 12px;
`;

S.CancelContainer = styled.View`
  width: ${n(18)}px;
  height: ${n(18)}px;
  border-radius: ${n(18)}px;
  background-color: ${colors.g4};

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 12px;

  position: absolute;
  z-index: 1;

  top: ${n(-5)}px;
  right: ${n(-15)}px;
`;
