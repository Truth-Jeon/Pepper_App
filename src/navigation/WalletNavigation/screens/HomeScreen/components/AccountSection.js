import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
import {ButtonM, St, Sv} from 'components/index';
import IcRefresh from 'images/svg/ic-refresh.svg';
import {putRequest} from 'apis/common';

export const AccountSection = ({isRefresh, setIsRefresh}) => {
  const dispatch = useDispatch();
  const {
    quick_address,
    balance,
    access,
    is_user_validation,
    is_trans_permission,
    is_first_transaction_agree,
    is_bank_certification_validation,
  } = useSelector(state => state.account);

  const navigation = useNavigation();

  const onTransactionAgreeUpdate = async () => {
    try {
      await putRequest('/v1/account/', {
        is_first_transaction_agree: true,
      });
      navigation.navigate('PayScreen');
      refreshAccount();
    } catch (e) {}
  };

  const goTransactionPage = () => {
    if (is_trans_permission) {
      if (is_first_transaction_agree) {
        navigation.navigate('PayScreen');
      } else {
        Alert.alert(
          '수수료 안내',
          '송금을 받는 유저는 수수료 1%를 제외한 페퍼 머니가 지급됩니다',
          [
            {
              text: '동의',
              onPress: () => {
                onTransactionAgreeUpdate();
              },
            },
            {
              text: '취소',
            },
          ],
          {
            cancelable: false,
          },
        );
      }
    } else {
      Alert.alert(
        '송금 권한이 없습니다',
        '송금 권한을 받으시려면 페퍼 고객센터로 문의해주세요',
        [
          {
            text: '확인',
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  const goRechargPage = () => {
    if (is_bank_certification_validation) {
      navigation.navigate('RechargeScreen');
    } else {
      navigation.navigate('VerifyScreen');
    }
  };

  const refreshAccount = () => {
    dispatch(setAccount());
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setAccount());
    }, []),
  );

  useEffect(() => {
    if (isRefresh) {
      refreshAccount();
    }
  }, [isRefresh]);

  const PepperPointSize = price => {
    const length = price.toLocaleString().length;
    console.log('length', length);
    if (length > 10) {
      return {
        fontSize: 21,
        lineHeight: 39,
      };
    } else {
      return {
        fontSize: 28,
        lineHeight: 39,
      };
    }
  };

  return (
    <>
      <S.Container>
        <Sv mt={4} jsb row>
          <St s2 g2>
            간편주소
          </St>
          <Sv
            as={TouchableOpacity}
            onPress={() => setIsRefresh(true)}
            p={8}
            m={-8}>
            <IcRefresh />
          </Sv>
        </Sv>
        <Sv
          as={TouchableOpacity}
          row
          py={4}
          px={8}
          ml={-8}
          onPress={() => {
            navigation.navigate('QRcodeScreen');
          }}>
          <St b2 primary style={{textDecorationLine: 'underline'}}>
            {quick_address}
          </St>
          <St b2 g2>
            {' '}
            님의 잔액
          </St>
        </Sv>
        <Sv mt={16} row aed jct>
          <S.PepperPointView
            fontSize={PepperPointSize(balance).fontSize}
            lineHeight={PepperPointSize(balance).lineHeight}>
            {balance.toLocaleString()}
          </S.PepperPointView>
          <Sv mb={8} ml={4}>
            <St s2 g0>
              페퍼(원)
            </St>
          </Sv>
        </Sv>
        <Sv row mt={28}>
          <Sv f={1}>
            <ButtonM fillGray title="충전" onPress={goRechargPage} />
          </Sv>

          <Sv w={6} />
          <Sv f={1}>
            <ButtonM onPress={goTransactionPage} title="송금" />
          </Sv>
        </Sv>
      </S.Container>
    </>
  );
};

const S = {};

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.Container = styled(Sv)`
  margin-top: ${n(24)}px;
  background-color: ${colors.white};
  padding: ${n(16)}px;
  border-radius: ${n(20)}px;
  margin: ${n(8)}px ${n(20)}px;
  //shadow
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.04;
  shadow-radius: 12px;
  // elevation: 2;
`;

S.PepperPointView = styled(St)`
  font-weight: bold;
  font-size: ${props => n(props.fontSize || 28)}px;
  line-height: ${props => n(props.lineHeight || 39)}px;
  color: ${colors.g0};
`;
