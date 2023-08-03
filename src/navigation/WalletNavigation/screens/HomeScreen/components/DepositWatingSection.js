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
import {ButtonL, SingleLineList, St, Sv} from 'components/index';
import {toastShowBottom, toastShowTop} from 'helper/toastHelper';
import Clipboard from '@react-native-clipboard/clipboard';
import moment from 'moment';
import ImageTimer from 'images/png/img-timer.png';
import {deleteRequest} from 'apis/common';

export const DepositWatingSection = ({
  getChargeStatus,
  chargeStatusModalData,
}) => {
  const [chargeTime, setChargeTime] = useState('00:00');
  const [isChargeStatus, setIsChargeStatus] = useState(true);

  const postCancelCharge = async () => {
    try {
      const result = await deleteRequest('/v1/account/charge/');
      console.log('취소', result);
      getChargeStatus();
      toastShowTop('success', '충전이 취소되었습니다.');
    } catch (e) {
      console.log('취소 err', e);
    }
  };

  const getChargeTime = () => {
    if (
      moment.duration(
        moment(chargeStatusModalData?.expire_date).diff(moment()),
      ) <= 0
    ) {
      setIsChargeStatus(false);
      return '00:00';
    }
    const hour = Math.floor(
      moment
        .duration(moment(chargeStatusModalData?.expire_date).diff(moment()))
        .asHours(),
    );
    const minute = Math.floor(
      moment
        .duration(moment(chargeStatusModalData?.expire_date).diff(moment()))
        .asMinutes(),
    );
    const second =
      Math.floor(
        moment
          .duration(moment(chargeStatusModalData?.expire_date).diff(moment()))
          .asSeconds(),
      ) % 60;
    setChargeTime(
      `${minute < 10 ? '0' + minute : minute}:${
        second < 10 ? '0' + second : second
      }`,
    );
  };

  useEffect(() => {
    let timer = null;
    if (isChargeStatus) {
      getChargeTime();
      timer = setInterval(() => {
        getChargeTime();
      }, 1000);
      return () => clearInterval(timer);
    } else {
      clearInterval(timer);
    }
  }, [isChargeStatus]);

  useEffect(() => {
    if (chargeStatusModalData) {
      setIsChargeStatus(true);
      setChargeTime(
        `${moment
          .duration(moment(chargeStatusModalData?.expire_date).diff(moment()))
          .minutes()}:${
          moment
            .duration(moment(chargeStatusModalData?.expire_date).diff(moment()))
            .seconds() < 10
            ? '0' +
              moment
                .duration(
                  moment(chargeStatusModalData?.expire_date).diff(moment()),
                )
                .seconds()
            : moment
                .duration(
                  moment(chargeStatusModalData?.expire_date).diff(moment()),
                )
                .seconds()
        }`,
      );
    }
  }, [chargeStatusModalData]);

  return (
    <S.Container>
      <Sv mt={4} jsb row w="100%" act>
        {moment.duration(
          moment(chargeStatusModalData?.expire_date).diff(moment()),
        ) > 0 ? (
          <St s2 primary>
            충전요청 입금 대기 중
          </St>
        ) : (
          <St s2 red>
            입금 시간 만료
          </St>
        )}

        <S.CopyBtn onPress={postCancelCharge}>
          <St s4 g3>
            충전신청 취소
          </St>
        </S.CopyBtn>
      </Sv>
      <Sv mt={12} row aed>
        <St h2 g0>
          {chargeStatusModalData?.point?.toLocaleString()}
        </St>
        <Sv mb={6} ml={4}>
          <St s3 g0>
            페퍼(원)
          </St>
        </Sv>
      </Sv>
      <Sv mt={16}>
        <St s4 g2>
          상세내역
        </St>
      </Sv>
      <Sv row jsb act>
        <Sv mt={4}>
          <Sv row>
            <St c2 g3 mr={5}>
              {'KEB하나은행'}
            </St>
            <St c2 g3>
              {moment.duration(
                moment(chargeStatusModalData?.expire_date).diff(moment()),
              ) > 0
                ? '37191002830204'
                : '만료'}
            </St>
          </Sv>
          <St c2 g3>
            {'주식회사 가보드림'}
          </St>
        </Sv>
        <S.CopyBtn
          onPress={() => {
            Clipboard.setString('37191002830204');
            toastShowBottom('success', '복사가 완료되었습니다.');
          }}>
          <St s4 g3>
            복사
          </St>
        </S.CopyBtn>
      </Sv>
      <St c2 g3 mt={4}>
        {'만료시간: ' +
          moment(chargeStatusModalData?.expire_date).format('YYYY-MM-DD HH:mm')}
      </St>

      {moment.duration(
        moment(chargeStatusModalData?.expire_date).diff(moment()),
      ) > 0 && (
        <S.ChargeRedyModal>
          <Sv jsb act row h={'100%'} pl={12} pr={5} as={TouchableOpacity}>
            <St s3 white>
              입금 대기중입니다.
            </St>
            <Sv w={75} h={27} bg={colors.primary} br={8} jct act row>
              <Image
                style={{width: 14, height: 14, marginRight: 3}}
                source={ImageTimer}
              />
              <St s3 white>
                {chargeTime}
              </St>
            </Sv>
          </Sv>
        </S.ChargeRedyModal>
      )}
    </S.Container>
  );
};

const S = {};

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;

S.Container = styled(Sv)`
  /* margin-top: ${n(4)}px; */
  /* margin-bottom: ${n(20)}px; */
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

S.CopyBtn = styled(TouchableOpacity)`
  background-color: ${colors.g6};
  border-radius: ${n(7)};
  align-items: center;
  justify-content: center;
  color: ${colors.g6};
  padding: 5px 8px;
  min-width: ${n(50)}px;
`;

S.ChargeRedyModal = styled.View`
  margin-top: ${n(16)}px;
  width: 100%;
  height: 39px;
  border-radius: 13px;
  background-color: #0a5337;
`;
