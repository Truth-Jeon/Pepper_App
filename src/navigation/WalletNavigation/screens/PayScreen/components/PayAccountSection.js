import React, {useEffect, useState} from 'react';
import {TouchableOpacity, FlatList, ScrollView} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

//components
import {ButtonL, St, Sv, InputM, BankSlide} from 'components/index';
import {AccountList} from 'components/List/AccountList';
import {getRequest} from 'apis/common';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorate, removeFavorate} from 'store/reducer/transactionReducer';

export const PayAccountSection = ({
  selectedTab,
  setSelectedTab,
  account,
  setAccount,
  balance,
  tag,
  setTag,
  isBankModalVisible,
  setIsBankModalVisible,
}) => {
  const navigation = useNavigation();

  const {account_favorate} = useSelector(state => state.transaction);
  const dispatch = useDispatch();

  const [userHistory, setUserHistory] = useState([]);
  const [userHistoryPage, setUserHistoryPage] = useState(1);
  const [userHistoryTotal, setUserHistoryTotal] = useState(0);

  const [history, setHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotal, setHistoryTotal] = useState(1);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '한국은행', value: '001'},
    {label: '산업은행', value: '002'},
    {label: '기업은행', value: '003'},
    {label: '외환은행', value: '005'},
    {label: '국민은행', value: '006'},
    {label: '수협중앙회', value: '007'},
    {label: '수출입은행', value: '008'},
    {label: '농협은행', value: '010'},
    {label: '농협중앙회', value: '011'},
    {label: '우리은행', value: '020'},
    {label: '제일은행', value: '023'},
    {label: '씨티은행', value: '027'},
    {label: '대구은행', value: '031'},
    {label: '부산은행', value: '032'},
    {label: '광주은행', value: '034'},
    {label: '제주은행', value: '035'},
    {label: '전북은행', value: '037'},
    {label: '경남은행', value: '039'},
    {label: '새마을금고중앙회', value: '045'},
    {label: '신협중앙회', value: '048'},
    {label: '상호저축은행', value: '050'},
    {label: '모간스탠리은행', value: '052'},
    {label: 'HSBC은행', value: '054'},
    {label: '도이치은행', value: '055'},
    {label: '알비에스피엘씨은행', value: '056'},
    {label: '제이피모간체이스은행', value: '057'},
    {label: '미즈호은행', value: '058'},
    {label: '미쓰비시도쿄UFJ은행', value: '059'},
    {label: 'BOA은행', value: '060'},
    {label: '비엔피파리은행', value: '061'},
    {label: '중국공상은행', value: '062'},
    {label: '중국은행', value: '063'},
    {label: '산림조합중앙', value: '064'},
    {label: '대화은행', value: '065'},
    {label: '우체국', value: '071'},
    {label: '신용보증기금', value: '076'},
    {label: '기술보증기금', value: '077'},
    {label: '하나은행', value: '081'},
    {label: '신한은행', value: '088'},
    {label: '카카오뱅크', value: '090'},
    {label: '토스뱅크', value: '092'},
  ]);

  const goQrScanScreen = () => {
    navigation.navigate('QRScannerScreen');
  };

  const goPriceInputScreen = (
    _account,
    transaction_type = 'trans',
    bank_code = '000',
  ) => {
    navigation.navigate('PayInputPriceScreen', {
      account: _account,
      balance,
      transaction_type,
      bank_code,
    });
  };

  const onPressStar = (isFavorate, item) => {
    if (isFavorate) {
      dispatch(removeFavorate(item));
    } else {
      dispatch(addFavorate(item));
    }
  };

  const getTransactionUsers = async () => {
    try {
      const result = await getRequest('/v1/account/transaction/user/');
      console.log('transaction user', result);
      if (userHistoryPage === 1) {
        setUserHistory(result?.results);
      } else {
        setUserHistory([...userHistory, ...result?.results]);
      }
      setUserHistoryTotal(result?.total_pages);
    } catch (e) {}
  };

  const getTransactionHistory = async () => {
    try {
      const result = await getRequest(
        '/v1/account/transaction/?sort_type=transfer',
        {
          page: historyPage,
        },
      );

      if (historyPage === 1) {
        setHistory(result?.results);
      } else {
        setHistory([...history, ...result?.results]);
      }
      setHistoryTotal(result?.total_pages);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getTransactionHistory();
  }, [historyPage]);

  useEffect(() => {
    getTransactionUsers();
  }, []);

  useEffect(() => {
    setAccount('');
  }, [selectedTab]);
  useEffect(() => {
    console.log('account_favorite', account_favorate);
  }, [account_favorate]);

  return selectedTab === 0 ? (
    <Sv px={22} mt={16} f={1}>
      <InputM
        value={account}
        onChangeText={t => setAccount(t)}
        placeholder="간편 주소"
      />
      <Sv mt={4}>
        <Sv as={TouchableOpacity} onPress={goQrScanScreen}>
          <St primary style={{textDecorationLine: 'underline'}}>
            간편주소 스캔하기
          </St>
        </Sv>
        <InputM
          value={tag}
          onChangeText={t => setTag(t)}
          placeholder="입금 코드"
        />
        <St g3 c2 mt={3}>
          입금 코드가 있는 경우만 넣어주세요
        </St>
      </Sv>

      <FlatList
        style={{flex: 1}}
        data={userHistory}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <St s2 mt={30}>
              {'즐겨찾기 주소'}
            </St>
            {/* 즐겨찾기 리스트 */}
            {account_favorate.length > 0 ? (
              account_favorate.map(item => (
                <AccountList
                  id={item.public_address}
                  name={item.quick_address}
                  comment={item.public_address}
                  isFavorate={account_favorate.find(
                    e => e.public_address === item.public_address,
                  )}
                  onPressStar={() => {
                    onPressStar(
                      account_favorate.find(
                        e => e.public_address === item.public_address,
                      ),
                      item,
                    );
                  }}
                  onPress={() => setAccount(item.quick_address)}
                />
              ))
            ) : (
              <Sv mt={20} act jct>
                <St c1 g4>
                  즐겨찾기한 주소가 없습니다.
                </St>
              </Sv>
            )}
            <St s2 mt={30}>
              {'최근 거래 주소'}
            </St>
          </>
        }
        onEndReached={() => {
          if (userHistoryPage < userHistoryTotal) {
            setUserHistoryPage(userHistoryPage + 1);
          }
        }}
        renderItem={({item, index}) => (
          <AccountList
            name={item.quick_address}
            comment={item.public_address}
            isFavorate={account_favorate.find(
              e => e.public_address === item.public_address,
            )}
            onPressStar={() => {
              onPressStar(
                account_favorate.find(
                  e => e.public_address === item.public_address,
                ),
                item,
              );
            }}
            onPress={() => {
              // console.log('item :', item);
              setAccount(item.quick_address);
              // goPriceInputScreen(item?.quick_address, 'trans');
            }}
          />
        )}
        ListFooterComponent={<Sv h={100} />}
        ListEmptyComponent={
          <Sv mt={20} act jct>
            <St c1 g4>
              최근 거래한 주소가 없습니다.
            </St>
          </Sv>
        }
      />
    </Sv>
  ) : selectedTab === 1 ? (
    <Sv px={22} mt={16} f={1} style={{minHeight: 300}}>
      <Sv f={1}>
        <ButtonL
          title={value ? value.label : '은행을 선택해주세요.'}
          grayLine
          onPress={() => setIsBankModalVisible(true)}
        />
        <BankSlide
          isVisible={isBankModalVisible}
          setIsVisible={setIsBankModalVisible}
          setValue={setValue}
        />

        <InputM
          value={account}
          onChangeText={t => setAccount(t)}
          placeholder="본인 명의의 계좌번호를 입력하세요."
        />
        <Sv mt={20}>
          <ButtonL
            disabled={account.length === 0 || value === null}
            title="출금신청"
            onPress={() => {
              goPriceInputScreen(account, 'withdraw', value.value);
            }}
          />
        </Sv>
      </Sv>
    </Sv>
  ) : (
    <Sv px={22} f={1}>
      <FlatList
        style={{flex: 1}}
        data={history}
        onEndReached={() => {
          if (historyPage < historyTotal) {
            setHistoryPage(historyPage + 1);
          }
        }}
        renderItem={({item, index}) => (
          <AccountList
            name={item.target_quick_account}
            comment={moment(item.created_at).format('YYYY-MM-DD HH:mm')}
            isHistory
            historyPrice={item.after_balance - item.before_balance}
            onPress={() =>
              goPriceInputScreen(item.target_quick_account, 'trans')
            }
          />
        )}
        ListFooterComponent={<Sv h={100} />}
        ListEmptyComponent={
          <Sv mt={40} act jct>
            <St c1 g4>
              최근 거래한 주소가 없습니다.
            </St>
          </Sv>
        }
      />
    </Sv>
  );
};

const S = {};

S.WithDrawButtonWrapper = styled.View`
  position: absolute;
  bottom: ${n(20)}px;
  left: ${n(22)}px;
  right: ${n(22)}px;
`;

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
