import {ButtonL, SingleLineList, St, Sv} from 'components/index';
import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styled from 'styled-components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {colors} from 'styles/colors';
import n from 'helper/normalize';

const RENDER_INFO_TEXT = [
  '비밀번호는 서버에 저장되지 않으며 설정한 기기에서만 유효합니다.',
  '따라서, 비밀번호를 잊어버린 경우 복구가 불가능합니다.',
  '비밀번호 변경은 설정-비밀번호 변경 메뉴에서가능합니다.',
];

export const LoginScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);

  const goInputPasswordScreen = () => {
    navigation.navigate('InputPasswordScreen');
  };

  const renderModalComponent = () => {
    return (
      <>
        <St s1 g0>
          앱 접근권한 안내
        </St>
        <Sv col mt={14} mr={20}>
          <St s3 g2 mb={20}>
            페이퍼는 아래의 권한을 사용합니다.
          </St>
          <St s3 g2>
            해당 기능이 필요할 때 선택 접근 권한의 이용 동의를 받고있으며,
            동의하지 않아도 앱의 이용이 가능합니다.{'\n'}어플리케이션 설정 {'>'}
            권한설정에서 설정변경이 가능합니다.
          </St>
        </Sv>
        <Sv mt={20}>
          <St s2 g2 mb={12}>
            • 필수 접근 권한
          </St>
          <S.PermissionItemContainer>
            <St b2 g2>
              필수 접근 권한이 없습니다.
            </St>
          </S.PermissionItemContainer>
          <St s2 g2 mt={12} mb={12}>
            • 선택 접근 권한
          </St>
          <S.PermissionItemContainer>
            <St b2 g2>
              카메라 {'('}QR코드 스캔중{')'}
            </St>
          </S.PermissionItemContainer>
        </Sv>
        <Sv mt={60}>
          <ButtonL title="확인" onPress={() => setIsVisible(false)} />
        </Sv>
      </>
    );
  };

  return (
    <S.Container>
      <View>
        <Sv px={22} py={20}>
          <St s1 g0>
            비밀번호를 설정해주세요
          </St>
          <Sv col mt={14} mr={20}>
            {RENDER_INFO_TEXT.map((e, i) => (
              <Sv row mb={14}>
                <St s3 g2>
                  {i + 1}.{' '}
                </St>
                <St s3 g2>
                  {e}
                </St>
              </Sv>
            ))}
          </Sv>
        </Sv>
        <Sv px={22}>
          <SingleLineList hasArrow title="비밀번호 설정 유의사항" />
          <SingleLineList hasArrow title="이용약관 동의" />
          <SingleLineList hasArrow title="개인정보 수집 및 이용 동의" />
        </Sv>
      </View>
      <View>
        <Sv px={18} mb={16}>
          <ButtonL onPress={goInputPasswordScreen} title="동의합니다" />
        </Sv>
      </View>
      <ModalSlide
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        renderComponent={renderModalComponent}
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  background-color: #fff;
`;

S.PermissionItemContainer = styled.View`
  background: ${colors.g6};
  padding: ${n(14)}px ${n(22)}px;
  border-radius: 8px;
`;
