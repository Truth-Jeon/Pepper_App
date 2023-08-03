import {ButtonL, HeaderM, SingleLineList, St, Sv} from 'components/index';
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {ChannelIO} from 'react-native-channel-plugin';

import {deleteRequest} from 'apis/common';
import {setFavorate} from 'store/reducer/transactionReducer';

import TouchID from 'react-native-touch-id';

import {toastShowBottom} from 'helper/toastHelper';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from 'store/reducer/accountReducer';
import {setAppLock, setBio, setBioCode} from 'store/reducer/appConfigReducer';
import {ModalSlide} from 'components/Modal/ModalSlide';
import {setPhoneVerify} from 'store/reducer/phoneVerifyReducer';

export const SettingScreen = ({navigation}) => {
  const [load, setLoad] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const {is_app_lock, is_biometric_authentication} = useSelector(
    state => state.appConfig,
  );

  const {isAuth, public_address} = useSelector(state => state.account);

  const dispatch = useDispatch();

  const goNoticeListScreen = () => {
    navigation.navigate('NoticeListScreen');
  };

  const goVersionInfoScreen = () => {
    navigation.navigate('VersionInfoScreen');
  };

  const goTermDetailScreen = term => {
    navigation.navigate('TermDetailScreen', {term});
  };

  const goPasswordChangeScreen = () => {
    navigation.navigate('PasswordChangeScreen');
  };

  const goAccountUtilScreen = () => {
    navigation.navigate('AccountUtilScreen');
  };

  const goPromotionScreen = () => {
    navigation.navigate('PromotionScreen');
  };

  const onPressBio = () => {
    if (is_biometric_authentication) {
      dispatch(setBio(false));
    } else {
      checkBio();
    }
  };

  const checkBio = async () => {
    const optionalConfigObject = {
      title: '생체인증 설정을 위하여 생체인증을 요청합니다.',
      imageColor: colors.primary,
      imageErrorColor: colors.red,
      authFailDescription: '생체 인증에 실패하였습니다.',
      cancelText: '취소',
    };
    TouchID.authenticate('', optionalConfigObject)
      .then(successOptions => {
        // Success code
        console.log('successOptions', successOptions);
        dispatch(setBioCode(successOptions));
        dispatch(setBio(true));
        toastShowBottom('success', '생체인증을 설정하였습니다.');
      })
      .catch(error => {
        // Failure code
        console.log(error);
        Alert.alert('생체인증 실패', '생체인증에 실패하였습니다.', [
          {text: '확인'},
        ]);
      });
  };

  const onPressChannelTalk = async () => {
    setLoad(true);
    let settings = {
      pluginKey: 'f9b60f9d-ea45-42b1-aa58-29a0de7c4209',
      memberId: public_address,
    };

    ChannelIO.boot(settings)
      .then(result => {
        ChannelIO.showMessenger();
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
      });
  };

  const onAccountDelete = async () => {
    try {
      await deleteRequest('/v1/account/');
      dispatch(logout());
      navigation.navigate('HomeScreen');
    } catch (e) {}
  };
  const renderModalComponent = () => {
    return (
      <>
        <Sv mt={22}>
          <St s1>서비스 탈퇴</St>
          <Sv>
            <St g2 mt={11}>
              1. 회원 탈퇴 시 모든 개인정보는 삭제되며 복구가 불가능합니다.
            </St>
            <St g2 mt={12}>
              2. 관계 법령에 따라 보관이 진행되어야 하는 일부 정보는 일정 기간
              보관됩니다.
            </St>
            <St g2 mt={12}>
              3. 페퍼 머니 보유 중 탈퇴 시 페퍼 머니 복구는 불가능합니다.
            </St>
          </Sv>
          <Sv mt={50}>
            <ButtonL
              title="서비스 탈퇴"
              onPress={() => {
                dispatch(
                  setPhoneVerify({
                    phone: '',
                    name: '',
                    birthdate: '',
                  }),
                );
                setIsWithdrawModalOpen(false);
                onAccountDelete();
              }}
            />
          </Sv>
        </Sv>
      </>
    );
  };

  return (
    <S.Container>
      {load && (
        <S.Loding>
          <ActivityIndicator />
        </S.Loding>
      )}
      <HeaderM title="설정" hasBack={false} />
      <ScrollView>
        <Sv px={20}>
          <SingleLineList
            g0
            py={16}
            hasArrow
            title="공지사항"
            onPress={goNoticeListScreen}
          />
          <SingleLineList
            g0
            py={16}
            hasArrow
            title="버전정보"
            onPress={goVersionInfoScreen}
          />
        </Sv>
        {isAuth && (
          <>
            <Sv w={'100%'} h={14} bg={colors.g6} />
            <Sv px={20}>
              <SingleLineList
                g0
                py={16}
                toggle={
                  <Switch
                    value={is_app_lock}
                    onValueChange={e => {
                      dispatch(setAppLock(e));
                    }}
                  />
                }
                title="앱 잠금"
              />
              <SingleLineList
                g0
                py={16}
                toggle={
                  <Switch
                    value={is_biometric_authentication}
                    onValueChange={e => {
                      onPressBio();
                      // dispatch(setBio(e));
                    }}
                  />
                }
                title="생체인증 설정"
                onPress={onPressBio}
                value={true}
              />
              <SingleLineList
                g0
                py={16}
                hasArrow
                title="비밀번호 변경"
                onPress={goPasswordChangeScreen}
              />
              <SingleLineList
                g0
                py={16}
                hasArrow
                title="간편주소 백업/복원"
                onPress={goAccountUtilScreen}
              />
              {/* <SingleLineList
                g0
                py={16}
                hasArrow
                title="프로모션 코드 입력"
                onPress={goPromotionScreen}
              /> */}
              <SingleLineList
                g0
                py={16}
                hasArrow
                title="로그아웃"
                onPress={() => {
                  Alert.alert(
                    '로그아웃',
                    '간편주소 백업을 하지 않은 경우 로그아웃 시 간편주소 복구가 불가능합니다. 로그아웃 하시겠습니까? ',
                    [
                      {
                        text: '로그아웃',
                        onPress: async () => {
                          dispatch(
                            setPhoneVerify({
                              phone: '',
                              name: '',
                              birthdate: '',
                            }),
                          );
                          dispatch(logout());
                          dispatch(setFavorate([]));
                          navigation.navigate('HomeScreen');
                        },
                      },
                      {
                        text: '취소',
                        onPress: () => {},
                      },
                    ],
                  );
                }}
              />
              <SingleLineList
                g0
                py={16}
                hasArrow
                title="서비스 탈퇴"
                onPress={() => {
                  return setIsWithdrawModalOpen(true);
                }}
              />
            </Sv>
          </>
        )}

        <Sv w={'100%'} h={14} bg={colors.g6} />
        <Sv px={20}>
          <SingleLineList
            onPress={() =>
              Linking.openURL(
                'https://pepper-production-bucket.s3.ap-northeast-2.amazonaws.com/files/%EC%95%B1+%EC%82%AC%EC%9A%A9+%EA%B0%80%EC%9D%B4%EB%93%9C%EB%9D%BC%EC%9D%B8+(1.4.3).pdf',
              )
            }
            g0
            py={16}
            hasArrow
            title="가이드 라인"
          />
          <SingleLineList
            onPress={() => Linking.openURL('https://www.pepper.ne.kr/')}
            g0
            py={16}
            hasArrow
            title="홈페이지 방문"
          />
          <SingleLineList
            g0
            py={16}
            hasArrow
            title="채널톡 상담"
            onPress={() => {
              onPressChannelTalk();
            }}
          />
          {/* <SingleLineList g0 py={16} hasArrow title="고객센터 1800-0000" /> */}
        </Sv>
        <Sv w={'100%'} h={14} bg={colors.g6} />
        <Sv px={20}>
          <SingleLineList
            g0
            py={16}
            hasArrow
            title="이용약관"
            onPress={() => goTermDetailScreen({title: '이용약관', id: 100})}
          />
          <SingleLineList
            g0
            py={16}
            hasArrow
            title="개인정보 처리방침"
            onPress={() =>
              goTermDetailScreen({title: '개인정보 처리방침', id: 200})
            }
          />
        </Sv>
        {/* <Sv>
          <TouchableOpacity onPress={() => dispatch(increment())}>
            <St>업</St>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(decrement())}>
            <St>다운</St>
          </TouchableOpacity>
          <St>count: {value}</St>
        </Sv> */}
      </ScrollView>
      <ModalSlide
        isVisible={isWithdrawModalOpen}
        setIsVisible={setIsWithdrawModalOpen}
        renderComponent={renderModalComponent}
      />
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.Loding = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.1);
`;
