import {ButtonL, ChoiceHeader, SingleLineList, St, Sv} from 'components/index';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import styled from 'styled-components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {colors} from 'styles/colors';
import n from 'helper/normalize';
import {TwoLineList} from 'components/List/TwoLineList';
import {getRequest} from 'apis/common';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

export const NoticeMainScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const onPressNotification = data => {
    try {
      const dataJson = JSON.parse(data);
      console.log(dataJson);
      const url = dataJson.deep_link_url;
      Linking.openURL(url);
    } catch (e) {
      console.log('open noti err', e);
    }
  };

  const getNotifications = async () => {
    try {
      const result = await getRequest(`/v1/account/notifications/`);
      console.log('알림', result);
      setNotifications(result.results);
    } catch (e) {
    } finally {
      setTimeout(() => {
        setIsFirstLoaded(true);
      }, 300);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, []),
  );

  return (
    <S.Container>
      <Sv row act px={20} pt={36} pb={24}>
        <S.HeaderText>알림목록</S.HeaderText>
      </Sv>
      <FlatList
        style={{paddingHorizontal: n(20)}}
        data={notifications}
        renderItem={({item}) => (
          <TwoLineList
            onPress={() => onPressNotification(item.data)}
            title={item.body}
            date={moment(item.created_at).format('YYYY-MM-DD HH:mm')}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          isFirstLoaded ? (
            <Sv act jct mt={40}>
              <St c1 g4>
                알림이 없습니다.
              </St>
            </Sv>
          ) : (
            <></>
          )
        }
      />
      {/* <Sv px={20}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={({item}) => (
              <TwoLineList
                title={item.body}
                date={moment(item.created_at).format('YYYY-MM-DD HH:mm')}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Sv act jct mt={40}>
            <St c1 g4>
              알림이 없습니다.
            </St>
          </Sv>
        )}
      </Sv> */}
      {/* <TwoLineList /> */}
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.HeaderText = styled.Text`
  font-size: ${n(26)}px;
  /* font-family: 'Pretendard'; */
  font-style: normal;
  font-weight: 700;
  color: ${colors.g0};
`;
