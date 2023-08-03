import React, {useRef, useState, useEffect} from 'react';

import {postRequest, getRequest} from 'apis/common';
import {ButtonL, HeaderL, SingleLineList, InputM, Sv} from 'components/index';
import {toastShowTop} from 'helper/toastHelper';
import {SafeAreaView, FlatList} from 'react-native';
import styled from 'styled-components';
import {ModalSlide} from 'components/Modal/ModalSlide';

const DealInputShipScreen = ({navigation, route}) => {
  const [shipNumber, setShipNumber] = React.useState('');
  const [shipCompanys, setShipCompanys] = React.useState([]);
  const [selectShipCompany, setSelectShipCompany] = React.useState(-1);
  const [isShipCompanyModalVisible, setIsShipCompanyModalVisible] =
    React.useState(false);
  const [isLoadingButton, setIsLoadingButton] = React.useState(false);

  useEffect(() => {
    getTrackingCompanyList();
  }, []);

  const postMarketShipInfo = async () => {
    setIsLoadingButton(true);
    try {
      const result = await postRequest(
        `/v1/market/request/${route.params?.uuid}/ship/`,
        {
          tracking_code: shipNumber,
          tracking_company: shipCompanys[selectShipCompany]?.code,
        },
      );
      console.log(result);
      navigation.goBack();
    } catch (e) {
      console.log(e);
      toastShowTop('error', '다시 시도해 주세요');
    } finally {
      setIsLoadingButton(false);
    }
  };

  const getTrackingCompanyList = async () => {
    try {
      const response = await getRequest('/v1/market/tracking-company/');
      console.log('택배', response);
      setShipCompanys(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onPressComplete = () => {
    postMarketShipInfo();
  };

  useEffect(() => {
    if (setSelectShipCompany !== -1) {
      setIsShipCompanyModalVisible(false);
    }
  }, [selectShipCompany]);
  return (
    <S.Container>
      <HeaderL title="배송 정보를 입력해주세요." />
      <Sv px={20} f={1}>
        <InputM
          title="택배사"
          value={
            selectShipCompany !== -1 ? shipCompanys[selectShipCompany].name : ''
          }
          placeholder={
            selectShipCompany !== -1 ? shipCompanys[selectShipCompany].name : ''
          }
          onPress={() => setIsShipCompanyModalVisible(true)}
          asButton
        />
        <Sv h={28} />
        <InputM
          title="운송장 번호"
          value={shipNumber}
          onChangeText={text => setShipNumber(text)}
        />
      </Sv>
      <Sv px={18} pb={16}>
        <ButtonL
          disabled={
            !(shipNumber.length > 0 && selectShipCompany !== -1) ||
            isLoadingButton
          }
          title="입력 완료"
          onPress={onPressComplete}
        />
      </Sv>
      <ModalSlide
        isVisible={isShipCompanyModalVisible}
        setIsVisible={setIsShipCompanyModalVisible}
        renderComponent={
          <Sv h={256}>
            <FlatList
              data={shipCompanys}
              renderItem={({item, index}) => (
                <SingleLineList
                  onPress={() => {
                    setSelectShipCompany(index);
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

export default DealInputShipScreen;

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
