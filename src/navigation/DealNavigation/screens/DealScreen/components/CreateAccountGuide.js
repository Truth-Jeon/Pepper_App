import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';
import n from 'helper/normalize';
import {colors} from 'styles/colors';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

//components
import {ButtonL, SingleLineList, St, Sv} from 'components/index';

//images
import ImgList from 'images/png/img-list.png';

export const CreateAccountGuide = () => {
  const navigation = useNavigation();

  const isAppleReview = () => {};

  const goAccountCreateScreen = () => {
    if (true) {
      isAppleReview();
    } else {
      navigation.navigate('PassWebViewScreen');
    }
  };

  return (
    <S.Container>
      <Sv mx={22} mt={12}>
        <Sv>
          <St h3 g0 mt={20}>
            {`인증이나 복잡한 서류 없이 간편주소를 만들어보세요.`}
          </St>
          <St b2 g3 mt={16}>
            {`아직 간편주소를 생성하지 않으셨습니다. 간편주소 생성 후에 서비스 이용 바랍니다.`}
          </St>
          <Sv h={150} act jct>
            <S.ImgList source={ImgList} />
          </Sv>
        </Sv>
        <Sv mb={16}>
          <ButtonL title="간편주소 만들기" onPress={goAccountCreateScreen} />
        </Sv>
      </Sv>
      {/* <Sv h={16} bg={colors.g6} /> */}
      <Sv mx={22}>
        <SingleLineList
          title="간편주소 복원하기"
          hasArrow
          onPress={async () => {
            try {
              const response = await DocumentPicker.pickSingle();
              navigation.navigate('AccountRestoreScreen', {
                file_uri: response.uri,
              });
            } catch (e) {}
          }}
        />
      </Sv>
    </S.Container>
  );
};

const S = {};

S.ImgList = styled(Image)`
  width: ${n(100)}px;
  height: ${n(100)}px;
  resize-mode: contain;
`;

S.Container = styled(Sv)`
  margin-top: ${n(24)}px;
  background-color: ${colors.white};
  padding: ${n(16)}px;
  margin: ${n(8)}px ${n(20)}px;
  border-radius: ${n(20)}px;
  //shadow
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.04;
  shadow-radius: 12px;
  // elevation: 2;
`;
