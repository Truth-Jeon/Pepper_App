import {HeaderL, InputM, St, Sv} from 'components/index';
import React from 'react';

export const AccountPasswordLayout = ({password, setPassword}) => {
  return (
    <Sv>
      <>
        <HeaderL title={'간편주소 복원을 위한\n비밀번호를 입력하세요'} />
        <Sv px={22} mt={40}>
          <InputM
            title="백업 파일 비밀번호"
            placeholder="비밀번호 입력"
            secureTextEntry={true}
            value={password}
            type="password"
            onChangeText={t => setPassword(t)}
          />
        </Sv>
      </>
    </Sv>
  );
};
123;
