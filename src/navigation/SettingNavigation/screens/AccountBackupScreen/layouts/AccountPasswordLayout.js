import {HeaderL, InputM, St, Sv} from 'components/index';
import React from 'react';

export const AccountPasswordLayout = ({
  password,
  setPassword,
  password2,
  setPassword2,
  passwordStatus,
}) => {
  return (
    <Sv>
      {passwordStatus === 0 && (
        <>
          <HeaderL title={'간편주소 백업을 위한\n비밀번호를 입력하세요'} />
          <Sv px={22} mt={40}>
            <InputM
              title="백업 파일 비밀번호"
              placeholder="비밀번호 입력"
              secureTextEntry={true}
              type="password"
              onChangeText={t => setPassword(t)}
            />
          </Sv>
        </>
      )}
      {passwordStatus === 1 && (
        <>
          <HeaderL title={'비밀번호를 다시 입력해주세요'} />
          <Sv px={22} mt={40}>
            <InputM
              title="백업 파일 비밀번호"
              placeholder="비밀번호 입력"
              value={password2}
              secureTextEntry={true}
              onChangeText={t => setPassword2(t)}
            />
          </Sv>
        </>
      )}
    </Sv>
  );
};
123;
