import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getRequest} from 'apis/common';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {St, Sv, ButtonL} from 'components/index';
import {useRoute, useNavigation} from '@react-navigation/native';

export const CloseTermDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [term, setTerm] = useState();
  const [existId, setExistId] = useState(true);
  const imagePath = require('../../../../images/png/img-xLogo.png');

  const getTerms = async () => {
    try {
      const result = await getRequest(
        `/v1/board/terms/${route.params?.term?.id}/`,
      );
      console.log(result);
      setTerm(result.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTerms();
    if (route.params?.term?.id === null) {
      setExistId(false);
    }
  }, []);

  return (
    <S.Container>
      <View style={styles.closed}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AccountCreateScreen', {isVisible: true})
          }>
          <Image source={imagePath} style={styles.closedBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{route.params?.term?.title}</Text>
      </View>
      <Sv p={22}>
        <ScrollView>
          {existId && <St>{term?.content}</St>}
          {existId || <St>{route.params?.term?.content}</St>}
          <View style={styles.checkBtn}>
            <ButtonL
              title="확인"
              onPress={() =>
                navigation.navigate('AccountCreateScreen', {isVisible: true})
              }
            />
          </View>
        </ScrollView>
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const styles = StyleSheet.create({
  closed: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  closedBtn: {
    marginRight: 30,
    marginBottom: 10,
    height: 14,
    width: 14,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkBtn: {
    marginTop: 25,
    marginBottom: 50,
  },
});
