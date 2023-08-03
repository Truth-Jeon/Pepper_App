import {Sv, St} from 'components/index';
import {getRandomInt} from 'helper/common';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
/**
 *
 * const [password, setPassword] = useState([-1, -1, -1, -1, -1, -1]);
 */

export const InputPass = ({password, setPassword}) => {
  const [passwordSequence, setPasswordSequence] = useState([]);

  useEffect(() => {
    if (passwordSequence.length == 10) return;
    const _passwordSequence = [];

    for (let i = 0; i < 10; i++) {
      let rand = getRandomInt(0, 10);
      while (true) {
        if (!_passwordSequence.includes(rand)) {
          console.log(rand);
          _passwordSequence.push(rand);
          break;
        }
        rand = getRandomInt(0, 10);
      }
    }

    setPasswordSequence(_passwordSequence);
  }, []);

  const PasswordButton = ({value}) => {
    const onPressButton = () => {
      //   console.log(password);
      let _password = [...password];
      const index = _password.indexOf(-1);
      if (value == 'del') {
        if (index < 1) return;
        _password[index - 1] = -1;
      } else {
        _password[index] = value;
      }
      setPassword(_password);
    };
    return (
      <Sv onPress={onPressButton} as={TouchableOpacity} f={1} act jct py={12}>
        <St h2 g0>
          {value}
        </St>
      </Sv>
    );
  };

  return passwordSequence.length < 10 ? null : (
    <Sv col w={'100%'}>
      <Sv row w={'100%'}>
        <PasswordButton value={passwordSequence[0]} />
        <PasswordButton value={passwordSequence[1]} />
        <PasswordButton value={passwordSequence[2]} />
        <PasswordButton value={passwordSequence[3]} />
      </Sv>
      <Sv row>
        <PasswordButton value={passwordSequence[4]} />
        <PasswordButton value={passwordSequence[5]} />
        <PasswordButton value={passwordSequence[6]} />
        <PasswordButton value={''} />
      </Sv>
      <Sv row>
        <PasswordButton value={passwordSequence[7]} />
        <PasswordButton value={passwordSequence[8]} />
        <PasswordButton value={passwordSequence[9]} />
        <PasswordButton value={'del'} />
      </Sv>
    </Sv>
  );
};
