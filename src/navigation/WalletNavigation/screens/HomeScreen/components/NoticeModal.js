import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {useDispatch} from 'react-redux';
import {logout} from 'store/reducer/accountReducer';
import {useSelector} from 'react-redux';
import {setAccount} from 'store/reducer/accountReducer';

//components
import {ButtonL, St, Sv} from 'components/index';
import {getRequest} from 'apis/common';

export const NoticeModal = ({isVisible, setIsVisible}) => {
  const [notices, setNotices] = useState([]);
  const getNotice = async () => {
    try {
      const result = await getRequest(`/v1/board/main-notice/`);

      setIsVisible(true);
      setNotices(result);
    } catch (e) {}
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
        transparent={true}
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <S.Container>
          <S.ModalWrapper>
            <S.ImageWrapper>
              <S.Image resizeMode="cover" source={{uri: notices?.image}} />
            </S.ImageWrapper>
            <S.ButtonWrapper>
              <ButtonL
                onPress={() => setIsVisible(false)}
                title="닫기"
                fillGray
              />
            </S.ButtonWrapper>
          </S.ModalWrapper>
        </S.Container>
      </Modal>
      {isVisible && <S.ModalOverlay />}
    </>
  );
};

const S = {};

S.Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

S.ModalWrapper = styled.View`
  position: relative;
  background: ${colors.white};
  width: ${n(320)}px;
  height: ${n(540)}px;
  border-radius: ${n(20)}px;
`;

S.ButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${n(20)}px ${n(22)}px;
`;

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

S.ImageWrapper = styled.View`
  width: 100%;
  height: 100%;
  padding-bottom: ${n(90)}px;
`;

S.Image = styled.Image`
  width: 100%;
  height: 100%;
  background: ${colors.g6};
  border-top-left-radius: ${n(20)}px;
  border-top-right-radius: ${n(20)}px;
`;
