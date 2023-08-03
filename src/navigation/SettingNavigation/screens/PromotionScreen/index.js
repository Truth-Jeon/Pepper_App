import React, {useEffect, useState} from 'react';

import {ButtonL, HeaderL, InputL, Sv, St} from 'components/index';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {postRequest, getRequest} from 'apis/common';
import {toastShowTop} from 'helper/toastHelper';
import Share from 'react-native-share';
import {colors} from 'styles/colors';
import n from 'helper/normalize';

export const PromotionScreen = () => {
  const {referral_code} = useSelector(state => state.account);
  const [existsRefferal, setExistsRefferal] = useState(false);
  const [inputRefferal, setInputRefferal] = useState('');
  const [referralState, setReferralState] = useState();
  const [isCompanyUser, setIsCompanyUser] = useState(false);

  const getIsCompanyUser = async () => {
    try {
      const result = await getRequest('/v1/account/company/account/check/');
      console.log('회사 유저 체크 결과', result);
      setIsCompanyUser(true);
    } catch (e) {
      setIsCompanyUser(false);
    }
  };

  const getExistsRefferal = async () => {
    try {
      const result = await getRequest('/v1/account/referral/');
      console.log('프로모션 신청 현황', result);
      setReferralState(result.result);
      setExistsRefferal(true);
    } catch (e) {
      setExistsRefferal(false);
      setReferralState();
    }
  };

  const requestRefferal = async () => {
    try {
      const response = await postRequest('/v1/account/referral/user/', {
        referral_code: inputRefferal,
      });
      toastShowTop('success', '성공적으로 등록 되었습니다.');
      setExistsRefferal(true);
      getExistsRefferal();
    } catch (e) {
      console.log(e.response);
      if (e?.response?.data?.message) {
        toastShowTop('error', e?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    getExistsRefferal();
  }, []);

  const onShare = async () => {
    const options = {
      message: referral_code,
    };

    try {
      const save = await Share.open(options);
    } catch (e) {}
  };

  return (
    <S.Container>
      <HeaderL
        title={referralState ? '나의 프로모션' : '프로모션 코드를 입력해주세요'}
      />
      {isCompanyUser && (
        <Sv px={22} row mb={referralState ? 20 : 40}>
          <Sv f={1}>
            <St>나의 프로모션 코드 : {referral_code}</St>
          </Sv>
          <S.CopyBtn onPress={onShare}>
            <St g3>공유하기</St>
          </S.CopyBtn>
        </Sv>
      )}
      {!isCompanyUser ? (
        !referralState ? (
          <Sv px={22} col jsb f={1}>
            <InputL
              placeholder="프로모션 코드"
              value={inputRefferal}
              onChangeText={t => setInputRefferal(t)}
            />
            <Sv pb={16}>
              <ButtonL
                title="등록"
                onPress={() => {
                  requestRefferal();
                }}
                disabled={inputRefferal.length > 0 ? false : true}
              />
            </Sv>
          </Sv>
        ) : (
          <Sv px={22} col jsb f={1}>
            <Sv col>
              <Sv mb={8}>
                <St s2>프로모션 간편 주소</St>
                <St c1>- {referralState?.referral_account.quick_address}</St>
              </Sv>
              <Sv mb={8}>
                <St s2>신청 상태</St>
                <St c1>
                  - {referralState?.is_accepted ? '수락됨' : '수락 대기중'}
                </St>
              </Sv>
              {referralState.agreement_fee_rate > 0 && (
                <Sv>
                  <St s2>계약 페이백 수수료</St>
                  <St c1>- {referralState?.agreement_fee_rate}%</St>
                </Sv>
              )}
            </Sv>
            {/* <Sv pb={16}>
            <ButtonL title="이미 입력하였습니다." disabled={true} />
          </Sv> */}
          </Sv>
        )
      ) : (
        <></>
      )}
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.CopyBtn = styled(TouchableOpacity)`
  background-color: ${colors.g6};
  border-radius: ${n(7)};
  align-items: center;
  justify-content: center;
  color: ${colors.g6};
  padding: 5px;
`;
