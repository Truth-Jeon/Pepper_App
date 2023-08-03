import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components';

import {Sv, HeaderL} from 'components/index';

export const PayConfHeader = ({account, title}) => {
  return (
    <Sv>
      <HeaderL title={`${account}님에게\n${title}하시겠습니까?`} />
    </Sv>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;
