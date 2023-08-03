import {getRequest} from 'apis/common';
import {HeaderM, St, Sv} from 'components/index';
import n from 'helper/normalize';
import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import moment from 'moment';

import Image from 'react-native-scalable-image';

export const NoticeDetailScreen = ({route}) => {
  const [notice, setNotice] = useState();

  const getNotice = async () => {
    try {
      const result = await getRequest(
        `/v1/board/notice/${route.params?.uuid}/`,
      );
      console.log(result);
      setNotice(result.result);
    } catch (e) {}
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <S.Container>
      <HeaderM title={notice?.is_main ? '팝업공지' : '일반공지'} />
      <Sv as={ScrollView} px={22}>
        <St b2 g2 mb={8}>
          {moment(notice?.created_at).format('YYYY-MM-DD')}
        </St>
        <St as={S.TitleText}>{notice?.title}</St>
        <Sv w={'100%'} h={1} bg={colors.g5} />
        {notice?.image && (
          <Sv mt={14}>
            <Image
              width={Dimensions.get('window').width - n(44)}
              resizeMode={'contain'}
              source={{uri: notice?.image}}
            />
          </Sv>
        )}
        <St mt={14} b1 g2>
          {notice?.content}
        </St>
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.Image = styled.Image`
  width: ${n(343)}px;

  border-radius: ${n(10)}px;
`;

S.TitleText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: ${n(16)}px;
`;
