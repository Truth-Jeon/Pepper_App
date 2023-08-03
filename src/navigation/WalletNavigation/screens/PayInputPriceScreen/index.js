import {ButtonL, HeaderL, InputM, St, Sv} from 'components/index';
import n from 'helper/normalize';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Pressable, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {useSelector} from 'react-redux';

const PayInputPriceScreen = ({navigation, route}) => {
  const {
    balance,
    daily_trans_limit,
    min_trans_limit,
    daily_withdrawal_limit,
    min_withdrawal_limit,
  } = useSelector(state => state.account);
  const [price, setPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState('');

  const [title] = useState(
    route.params?.transaction_type === 'trans' ? '송금' : '출금',
  );

  const addPriceNum = num => {
    let newNum;
    if (price.length === 0) {
      newNum = num;
    } else {
      newNum = parseInt(price, 10) + num;
    }
    setPrice(newNum);
  };

  const goConfirmScreen = () => {
    if (isNaN(price)) {
      return Alert.alert(`${title}할 금액을 확인해주세요`, '', [
        {text: '확인'},
      ]);
    }
    if (price > balance) {
      return Alert.alert('잔액이 부족합니다', '', [{text: '확인'}]);
    }

    if (
      (title === '송금' && price < min_trans_limit) ||
      (title === '출금' && price < min_withdrawal_limit)
    ) {
      return Alert.alert(`최소 ${title} 금액보다 적습니다.`, '', [
        {text: '확인'},
      ]);
    }
    if (
      title === '출금' &&
      price >= daily_withdrawal_limit &&
      parseInt(price, 10) + 1000 > balance
    ) {
      return Alert.alert('수수료(1,000원)을 지불 할 금액이 부족합니다.', '', [
        {text: '확인'},
      ]);
    }

    if (
      (title === '송금' && price > daily_trans_limit) ||
      (title === '출금' && price > daily_withdrawal_limit)
    ) {
      return Alert.alert(`최대 ${title} 금액보다 많습니다.`, '', [
        {text: '확인'},
      ]);
    }

    navigation.navigate('PayConfirmScreen', {
      price: price,
      account: route.params?.account,
      balance: route.params?.balance,
      tag: route.params?.tag,
      transaction_type: route.params?.transaction_type,
      bank_code: route.params?.bank_code,
    });
  };

  useEffect(() => {
    console.log(parseInt(price, 10).toLocaleString(), price);
    setDisplayPrice(parseInt(price, 10).toLocaleString());
  }, [price]);

  return (
    <S.Container>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <Sv f={1}>
          <HeaderL title={`${title}할 금액을 입력하세요`} />
          <St mx={22} g3>
            {title} 가능 금액 {balance.toLocaleString()}원
          </St>
          <Sv px={22}>
            <InputM
              placeholder={`${title}할 금액을 입력하세요`}
              value={displayPrice}
              onChangeText={t => {
                const regex = /[^0-9]/g;
                const priceValue = t.replace(regex, '') || 0;
                setPrice(priceValue);
              }}
              numberType
            />
            <St g3 mt={8}>
              {title === '송금'
                ? `최소 송금 금액 ${min_trans_limit.toLocaleString()}원 / 1일 송금한도 ${daily_trans_limit.toLocaleString()}원`
                : `최소 출금 금액 ${min_withdrawal_limit.toLocaleString()}원 / 1일 출금 한도 ${daily_withdrawal_limit.toLocaleString()}원`}
            </St>
            <Sv row mt={12}>
              <S.Badge as={TouchableOpacity} onPress={() => setPrice(0)}>
                <St s3 g2>
                  초기화
                </St>
              </S.Badge>
              <S.Badge as={TouchableOpacity} onPress={() => addPriceNum(50000)}>
                <St s3 g2>
                  +5만
                </St>
              </S.Badge>
              <S.Badge
                as={TouchableOpacity}
                onPress={() => addPriceNum(100000)}>
                <St s3 g2>
                  +10만
                </St>
              </S.Badge>
              <S.Badge
                as={TouchableOpacity}
                onPress={() => addPriceNum(1000000)}>
                <St s3 g2>
                  +100만
                </St>
              </S.Badge>
            </Sv>
          </Sv>
        </Sv>
      </Pressable>
      <S.ButtonContainer>
        <ButtonL
          disabled={price.length === 0}
          title="확인"
          onPress={goConfirmScreen}
        />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default PayInputPriceScreen;

const S = {};

S.Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

S.Badge = styled.View`
  border-radius: 8px;
  background-color: ${colors.g6};
  padding: ${n(5)}px ${n(10)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${n(8)}px;
`;

S.ButtonContainer = styled.View`
  position: absolute;
  bottom: ${n(16)}px;
  right: 0;
  left: 0;

  padding: ${n(20)}px;
`;
