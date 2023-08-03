import {getRequest} from 'apis/common';
import {HeaderL, Sv} from 'components/index';
import {TwoLineList} from 'components/List/TwoLineList';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setNotices} from 'store/reducer/noticeReducer';

export const NoticeListScreen = ({navigation}) => {
  const goNoticeDetailScreen = uuid => {
    navigation.navigate('NoticeDetailScreen', {uuid});
  };

  const dispatch = useDispatch();
  const {notices, isLoading} = useSelector(state => state.notice);

  useEffect(() => {
    dispatch(setNotices());
  }, []);

  return (
    <S.Container>
      <HeaderL title="공지사항" />
      <Sv px={22} f={1}>
        <FlatList
          style={{flex: 1}}
          data={notices}
          onEndReached={() => {
            dispatch(setNotices());
          }}
          renderItem={({item, index}) => {
            return (
              <TwoLineList
                title={item.title}
                date={`${moment(item.created_at).format(
                  'YYYY년 MM월 DD일',
                )} | ${item.is_main ? '팝업공지' : '일반공지'}`}
                onPress={() => goNoticeDetailScreen(item.uuid)}
              />
            );
          }}
        />
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
