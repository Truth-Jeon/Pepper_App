import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SectionList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getRequest, postRequest} from 'apis/common';
import {ModalSlide} from 'components/Modal/ModalSlide';
import moment from 'moment';
import ImgArrowBottom from 'images/png/img-bottom-arrow.png';
import {ButtonL, SingleLineList, St, Sv} from 'components/index';
import {DepositWatingSection} from './DepositWatingSection';
import {toastShowTop} from 'helper/toastHelper';

const SORT_ARRAY = [
  {
    id: 'all',
    title: '전체',
  },
  {
    id: 'charge',
    title: '충전',
  },
  {
    id: 'transfer',
    title: '송금',
  },
  {
    id: 'withdraw',
    title: '출금',
  },
];

const TRANSACTION_TYPE = [
  {
    id: 100,
    name: '충전',
  },
  {
    id: 200,
    name: '송금',
  },
  {
    id: 300,
    name: '출금',
  },
];

moment.locale('ko');

export const MarketLogSection = ({setIsOverlay, isRefresh, setIsRefresh}) => {
  const [logRowList, setLogRowList] = useState([]);
  const [logList, setLogList] = useState([]);

  const navigation = useNavigation();

  const getMarketTransactionLog = async () => {
    try {
      const result = await getRequest('/v1/market/transaction-log/');
      console.log(result);
      setLogRowList(result.results);
    } catch (e) {
      console.log('??', e);
    }
  };

  const generateLogList = () => {
    const result = [
      ...new Set(
        logRowList.map(item => moment(item.created_at).format('YYYY-MM-DD')),
      ),
    ].map(value => {
      return {
        title: value,
        data: logRowList.filter(
          item => moment(item.created_at).format('YYYY-MM-DD') === value,
        ),
      };
    });
    console.log('result', result);

    setLogList(result);
  };

  useEffect(generateLogList, [logRowList]);

  useFocusEffect(
    useCallback(() => {
      getMarketTransactionLog();
    }, []),
  );

  useEffect(() => {
    if (isRefresh) {
      getMarketTransactionLog();
    }
  }, [isRefresh]);

  const RenderItem = ({date, market_title, price, isMe}) => {
    return (
      <Sv
        pb={12}
        pt={12}
        as={TouchableOpacity}
        onPress={() => {
          toastShowTop(
            'success',
            isMe ? '구매확정 후 송금됩니다.' : '구매확정 후 입금됩니다.',
          );
        }}>
        <Sv row>
          <Sv f={1}>
            <St s2 g0>
              {market_title}의 {isMe ? '송금대기' : '입금대기'}
            </St>
          </Sv>

          <St s2 g0 red={isMe}>
            {!isMe ? '+' : '-'}
            {price.toLocaleString()} 원
          </St>
        </Sv>
        <Sv row>
          <Sv f={1}>
            <St c2 g3>
              {date}
            </St>
          </Sv>
          <St c2 g3>
            {/* {balance.toLocaleString()} 원 */}
          </St>
        </Sv>
      </Sv>
    );
  };

  return logList.length == 0 ? (
    <></>
  ) : (
    <Sv f={1}>
      <S.Container as={TouchableOpacity} activeOpacity={1}>
        <Sv mt={4} jsb row w="100%">
          <St s2 g2>
            장터 출금대기 내역
          </St>
        </Sv>
        <Sv f={1} w={'100%'} pt={18}>
          {logList.length > 0 ? (
            logList.map((his, index) => {
              return (
                <>
                  <St c2 g3>
                    {his.title}
                  </St>
                  {his.data.map((item, index) => {
                    return (
                      <RenderItem
                        isMe={item.is_me}
                        date={moment(item.created_at).format('HH:mm')}
                        market_title={item.market_request_item.item.title}
                        price={item.price}
                      />
                    );
                  })}
                </>
              );
            })
          ) : (
            <Sv mt={20} act jct>
              <St c1 g4>
                내역이 없습니다.
              </St>
            </Sv>
          )}
        </Sv>
      </S.Container>
    </Sv>
  );
};

const S = {};

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.Container = styled(Sv)`
  /* margin-top: ${n(20)}px; */
  background-color: ${colors.white};
  padding: ${n(16)}px;
  margin: ${n(8)}px ${n(20)}px;
  border-radius: ${n(20)}px;
  //shadow
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.04;
  shadow-radius: 12px;
  elevation: 2;
  min-height: ${n(200)}px;
`;
