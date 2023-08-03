import {postRequest} from 'apis/common';
import {ButtonL, HeaderL, InputL, Sv} from 'components/index';
import React from 'react';
import {Keyboard, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCertificationValidationSuccess} from 'store/reducer/accountReducer';
import {toastShowTop} from 'helper/toastHelper';

export const VerifyAccountSection = ({setSelectedSection, certificationId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [content, setContent] = React.useState('');
  const postCheckVerifyAccount = async () => {
    try {
      const result = await postRequest(
        `/v1/account/bank/certification/validation/${certificationId}/`,
        {
          inPrintContent: content,
        },
      );
      console.log(result);
      dispatch(setCertificationValidationSuccess());
      navigation.goBack();
      navigation.navigate('RechargeScreen');
    } catch (e) {
      toastShowTop('error', '송금자명을 확인해주세요.');
    }
  };

  return (
    <Pressable style={{flex: 1}} onPressIn={Keyboard.dismiss}>
      <HeaderL
        title={`1원을 보내드렸어요.\n송금자명 4자리를 입력해주세요.`}
        customBackPress={() => {
          setSelectedSection(0);
        }}
      />
      <Sv mx={20} jsb col flex={1}>
        <InputL
          placeholder="ex) 놀란하마"
          value={content}
          onChangeText={t => setContent(t)}
        />
        <Sv mb={16}>
          <ButtonL title="인증하기" onPress={postCheckVerifyAccount} />
        </Sv>
      </Sv>
    </Pressable>
  );
};
