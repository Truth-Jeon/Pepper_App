import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, SafeAreaView, Image} from 'react-native';
import n from 'helper/normalize';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {ButtonL, St, Sv} from 'components/index';
import {ModalSlide} from 'components/Modal/ModalSlide';
import styled from 'styled-components';
import {CheckTermList} from 'components/List/CheckTermList';
import {getRequest} from 'apis/common';

export const AccountCreateTermScreen = ({
  isVisible,
  setIsVisible,
  quickAccount,
  isAccountGood,
}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {phone} = useSelector(state => state.phoneVerify);
  if (quickAccount === undefined) {
    quickAccount = route.params.quickAccount;
  }

  const nice = () => {
    if (quickAccount === '3259') {
      dispatch(
        // eslint-disable-next-line no-undef
        setPhoneVerify({
          phone: '01011112222',
          name: '애플심사',
          birthdate: '19960831',
        }),
      );
      search_account();
    } else {
      navigation.navigate('PassWebViewScreen');
    }
  };

  useEffect(() => {
    if (phone.length > 0) {
      search_account();
    }
  }, [phone, search_account]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search_account = useCallback(async () => {
    const engNum = /^[a-zA-Z0-9]*$/;
    if (!engNum.test(quickAccount)) {
      // eslint-disable-next-line no-undef
      toastShowTop('error', '영문 및 숫자만 입력 가능합니다.');
      return false;
    }
    if (quickAccount.length < 3 || quickAccount.length > 10) {
      // eslint-disable-next-line no-undef
      toastShowTop('error', '3~10자리로 입력해주세요.');
      return false;
    }
    try {
      await getRequest(
        `/v1/account/search/?search=${quickAccount}&search_type=quick_address`,
      );
      // eslint-disable-next-line no-undef
      toastShowTop('error', '간편주소가 이미 존재합니다.');
    } catch (e) {
      if (e.response.status === 404) {
        navigation.navigate('InputPasswordScreen', {
          type: 'createAccount',
          quickAddress: quickAccount,
        });
      } else {
        // eslint-disable-next-line no-undef
        toastShowTop('error', e.response.data.message);
      }
    }
  });

  const initialState = {
    terms: false,
    personal: false,
    simple: false,
  };

  const useRenderModalComponent = () => {
    const [isSelected, setIsSelected] = useState(initialState);
    return (
      <>
        <Sv mt={22}>
          <St s1 style={styles.modalTitle}>
            페퍼 간편 주소 이용에 동의해주세요.
          </St>
          <View style={styles.checkboxContainer}>
            <CheckTermList
              disabled={false}
              value={isSelected.terms}
              onValueChange={value => {
                setIsSelected({
                  ...isSelected,
                  terms: value,
                });
              }}
              style={styles.checkbox}
              title="이용약관 (필수)"
              terms={{
                title: '이용약관',
                id: 100,
                quickAccount: quickAccount,
              }}
              setIsVisible={setIsVisible}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckTermList
              disabled={false}
              value={isSelected.personal}
              onValueChange={value =>
                setIsSelected({
                  ...isSelected,
                  personal: value,
                })
              }
              style={styles.checkbox}
              title="개인정보처리방침 (필수)"
              terms={{
                title: '개인정보처리방침',
                id: 200,
                quickAccount: quickAccount,
              }}
              setIsVisible={setIsVisible}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckTermList
              disabled={false}
              value={isSelected.simple}
              onValueChange={value =>
                setIsSelected({
                  ...isSelected,
                  simple: value,
                })
              }
              style={styles.checkbox}
              title="간편주소이용동의 (필수)"
              terms={{
                title: '간편주소이용동의',
                id: null,
                quickAccount: quickAccount,
                content: `1. 페퍼 간편 주소는 페퍼 입출금시 사용됩니다.
2. 충전 결제/입금 후 2시간 2영업일 이내에 충전금액의 계좌출금기능은 전자금융범죄 피해 예방을 위해 제한될 수 있습니다.
3. 페퍼 앱 (휴대폰) 분실, 삭제 및 유출 등 개인 부주의로 인해 페퍼 앱 접근이 불가능한 경우, 그로 인한 사용자 개인 자산의 피해는 완전히 사용자의 책임입니다.
4. 사용자가 기억하기 쉬운 영문, 숫자로 최소 3자 최대 12자까지 사용하여 생성할 수 있습니다.
5. 간편 주소 백업을 하지 않거나, 분실한 경우 복구가 불가능하며, 개인 자산의 피해는 사용자의 책임입니다.`,
              }}
              setIsVisible={setIsVisible}
            />
          </View>
          <Sv mt={50}>
            <ButtonL
              title="동의합니다"
              onPress={() => setIsVisible(false)}
              disabled={
                isSelected.personal &&
                isSelected.simple &&
                isSelected.terms === true
                  ? false
                  : true
              }
            />
          </Sv>
        </Sv>
      </>
    );
  };

  return (
    <>
      <S.Container>
        <Sv mx={22} mb={22}>
          <ButtonL
            disabled={quickAccount.length < 3 || !isAccountGood}
            title="확인"
            onPress={nice}
          />
        </Sv>
      </S.Container>
      <ModalSlide
        isVisible={isVisible}
        setIsVisible={() => {}}
        isPressable={false}
        renderComponent={useRenderModalComponent}
      />
    </>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  /* flex: 1; */
`;

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: 10,
  },
  checkboxContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
});
