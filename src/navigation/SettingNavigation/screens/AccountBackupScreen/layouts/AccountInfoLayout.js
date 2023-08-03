import {HeaderL, InputM, St, Sv} from 'components/index';
import React from 'react';

export const AccountInfoLayout = ({name, setName}) => {
  return (
    <Sv>
      <HeaderL title="간편주소 백업" />
      <Sv px={22} mt={40}>
        {/* <St b2 g3 mb={55}>
          백업할 파일명을 입력해 주세요.
        </St> */}
        <InputM
          title="백업 파일명"
          value={name}
          onChangeText={t => setName(t)}
          placeholder="영문, 숫자3~10자"
          maxLength={10}
        />
      </Sv>
    </Sv>
  );
};
