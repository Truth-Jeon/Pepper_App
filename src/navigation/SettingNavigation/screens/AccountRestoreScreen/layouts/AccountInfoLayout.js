import {HeaderL, InputM, St, Sv} from 'components/index';
import React from 'react';

export const AccountInfoLayout = ({name, setName}) => {
  return (
    <Sv>
      <HeaderL title="간편주소 백업" />
      <Sv px={22}>
        <St b2 g3 mb={55}>
          페퍼간편주소 백업 메뉴를 사용하시려면 비밀번호 설정을 먼저 하셔야
          합니다.
        </St>
        <InputM
          title="백업 파일명"
          value={name}
          onChangeText={t => setName(t)}
        />
      </Sv>
    </Sv>
  );
};
