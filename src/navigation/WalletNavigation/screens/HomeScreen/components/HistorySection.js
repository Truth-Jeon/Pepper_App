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

export const HistorySection = ({
  getChargeStatus,
  setIsOverlay,
  chargeStatusModalData,
  isRefresh,
  setIsRefresh,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sortType, setSortType] = useState('all');
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [transactionModalData, setTransactionModalData] = useState({});

  const [historyRowData, setHistoryRowData] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const getHistoryList = async _page => {
    setRefreshing(true);

    try {
      const response = await getRequest(
        `/v1/account/transaction/?sort_type=${sortType}&page=${_page}`,
      );

      if (page === 1) {
        setHistoryRowData([...response.results.slice(0, 5)]);
      } else {
        setHistoryRowData([...historyRowData, ...response.results]);
      }
      setTotalPage(response.total_pages);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const generateHistory = () => {
    const result = [
      ...new Set(
        historyRowData.map(item =>
          moment(item.created_at).format('YYYY-MM-DD'),
        ),
      ),
    ].map(value => {
      return {
        title: value,
        data: historyRowData.filter(
          item => moment(item.created_at).format('YYYY-MM-DD') === value,
        ),
      };
    });

    setHistory(result);
  };

  useEffect(generateHistory, [historyRowData]);

  useFocusEffect(
    useCallback(() => {
      getHistoryList(page);
    }, []),
  );

  useEffect(() => {
    if (isRefresh) {
      getHistoryList(page);
    }
  }, [isRefresh]);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('page :', page);
  //     getHistoryList(page);
  //   }, [page]),
  // );

  useEffect(() => {
    getHistoryList(page);
  }, [page]);

  useEffect(() => {
    setIsSortModalVisible(false);
    if (sortType) {
      if (page === 1) {
        getHistoryList(1);
      } else {
        setPage(1);
      }
    }
  }, [sortType]);

  useEffect(() => {
    if (transactionModalData?.transaction_hash) {
      setIsVisible(true);
    }
  }, [transactionModalData]);

  useEffect(() => {
    setIsOverlay(isVisible);
    if (!isVisible) {
      setTransactionModalData({});
    }
  }, [isVisible]);

  const renderModalComponent = () => {
    return (
      <>
        <Sv>
          <St s1>거래내역</St>
          <Sv>
            <Sv>
              <St g3 mt={22}>
                거래구분
              </St>
              <St s2 mt={8}>
                {transactionModalData?.transaction_type}
              </St>
            </Sv>
            <Sv>
              <St g3 mt={22}>
                거래계좌
              </St>
              <St s2 mt={8}>
                {transactionModalData?.target_quick_account}
              </St>
            </Sv>
            <Sv>
              <St g3 mt={22}>
                거래주소
              </St>
              <St s2 mt={8}>
                {transactionModalData?.transaction_hash}
              </St>
            </Sv>
            <Sv>
              <St g3 mt={22}>
                거래시간
              </St>
              <St s2 mt={8}>
                {moment(transactionModalData.date).format('YYYY-MM-DD HH:mm')}
              </St>
            </Sv>
            <Sv mt={22} h={15} bg={colors.g6} />
            <Sv>
              <St g3 mt={22}>
                변동 금액
              </St>
              <St s2 mt={8}>
                {transactionModalData?.is_increase ? '+' : '-'}
                {parseInt(transactionModalData?.price, 10).toLocaleString()}원
              </St>
            </Sv>
          </Sv>
          <Sv mt={50}>
            <ButtonL
              title="확인"
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </Sv>
        </Sv>
      </>
    );
  };

  const RenderItem = ({
    account,
    price,
    date,
    balance,
    transaction_hash,
    transaction_type,
    target_quick_account,
    is_increase,
  }) => {
    return (
      <Sv
        pb={12}
        pt={12}
        as={TouchableOpacity}
        onPress={() => {
          setTransactionModalData({
            is_increase: is_increase,
            account: account,
            price: price,
            date: date,
            balance: balance,
            transaction_hash: transaction_hash,
            transaction_type: TRANSACTION_TYPE.find(
              element => element.id === transaction_type,
            ).name,
            target_quick_account: target_quick_account,
          });
          // setIsVisible(true);
        }}>
        <Sv row>
          <Sv f={1}>
            <St s2 g0>
              {target_quick_account}
            </St>
          </Sv>

          <St s2 g0 red={!is_increase}>
            {is_increase ? '+' : '-'}
            {price.toLocaleString()} 원
          </St>
        </Sv>
        <Sv row>
          <Sv f={1}>
            <St c2 g3>
              {moment(date).format('HH:mm')}
            </St>
          </Sv>
          <St c2 g3>
            {balance.toLocaleString()} 원
          </St>
        </Sv>
      </Sv>
    );
  };

  return (
    <Sv f={1}>
      {chargeStatusModalData && (
        <DepositWatingSection
          getChargeStatus={getChargeStatus}
          chargeStatusModalData={chargeStatusModalData}
        />
      )}
      <S.Container
        as={TouchableOpacity}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('DepositHistoryScreen');
        }}>
        <Sv mt={4} jsb row w="100%">
          <St s2 g2>
            이용내역
          </St>
          <Sv
            row
            act
            as={TouchableOpacity}
            onPress={() => {
              setIsSortModalVisible(true);
            }}>
            <St b2 g2 mr={5}>
              {
                SORT_ARRAY.filter(item => {
                  return item.id === sortType;
                })[0].title
              }
            </St>
            <Sv>
              <Image
                source={ImgArrowBottom}
                style={{width: n(9), height: n(4.5)}}
              />
            </Sv>
          </Sv>
        </Sv>

        <Sv f={1} w={'100%'} pt={18}>
          {history.length > 0 ? (
            history.map((his, index) => {
              return (
                <>
                  <St c2 g3>
                    {his.title}
                  </St>
                  {his.data.map((item, index) => {
                    return (
                      <RenderItem
                        transaction_type={item.transaction_type}
                        account={item.account}
                        price={item.transfer_point}
                        date={item.created_at}
                        balance={item.after_balance}
                        transaction_hash={item.transaction_hash}
                        target_quick_account={item.target_quick_account}
                        is_increase={item.is_increase}
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
      <ModalSlide
        isVisible={isSortModalVisible}
        setIsVisible={setIsSortModalVisible}
        renderComponent={
          <Sv style={{maxHeight: 170}}>
            <FlatList
              data={SORT_ARRAY}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => (
                <SingleLineList
                  onPress={() => {
                    setSortType(item.id);
                  }}
                  title={item.title}
                />
              )}
            />
          </Sv>
        }
      />
      <ModalSlide
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        renderComponent={renderModalComponent}
      />
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
