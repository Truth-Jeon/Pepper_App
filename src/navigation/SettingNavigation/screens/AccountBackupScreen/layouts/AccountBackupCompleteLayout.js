import {HeaderL, InputM, St, Sv} from 'components/index';
import React from 'react';
import IcComplete from 'images/svg/ic-complete-check.svg';
import styled from 'styled-components';

export const AccountBackupCompleteLayout = ({name, setName}) => {
  return (
    <Sv px={22} act mt={140}>
      <IcComplete />
      <S.Text>페퍼간편주소 백업을 완료했습니다.</S.Text>
    </Sv>
  );
};

const S = {};

S.Text = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20;

  color: #161d24;
`;
