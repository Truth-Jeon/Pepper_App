import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';

import {Sv, HeaderL} from 'components/index';

export const AccountCreHeader = () => {
  return (
    <Sv>
      <HeaderL title={'간편주소를\n입력해주세요'} />
    </Sv>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

S.ImgList = styled(Image)`
  width: ${n(200)}px;
  height: ${n(200)}px;
  resize-mode: contain;
`;
