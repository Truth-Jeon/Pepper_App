import {getRequest, postRequest} from 'apis/common';
import {HeaderM, St, Sv} from 'components/index';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setTerms} from 'store/reducer/termReducer';

export const TermDetailScreen = ({navigation, route}) => {
  // const [term, setTerm] = useState();

  // const dispatch = useDispatch();
  // const {terms, isLoading} = useSelector(state => state.term);

  // useEffect(() => {
  //   dispatch(setTerms());
  // }, []);

  const [term, setTerm] = useState();
  const [terms, setTerms] = useState();

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
  }, []);

  return (
    <S.Container>
      <HeaderM title={route.params?.term?.title} />
      <Sv p={22}>
        <ScrollView>
          <St>{term?.content}</St>
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
