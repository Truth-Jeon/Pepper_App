import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {useNavigation} from '@react-navigation/native';
import {useCodePush} from 'hooks/CodePushProvider';
import {ActivityIndicator, BackHandler} from 'react-native';
import codePush from 'react-native-code-push';
import {Alert, Platform} from 'react-native';
import {useSelector} from 'react-redux';

const SplashScreen = ({route}) => {
  const navigation = useNavigation();
  const {progress, status, onStartSync} = useCodePush();

  const {is_app_lock} = useSelector(state => state.appConfig);
  const {isAuth} = useSelector(state => state.account);

  const [updateProgress, setUpdateProgress] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('Loading...');
  const [versionValid, setVersionValid] = useState(false);

  React.useEffect(() => {
    checkVersion();
  }, []);

  React.useEffect(() => {
    checkCodePushUpdate(status);
    setUpdateProgress(progress);
  }, [progress, status]);

  const AppQuitAlert = (message, content = '잠시후에 다시 실행해주세요.') =>
    Alert.alert(
      message,
      content,
      [
        {
          text: '확인',
          onPress: () => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp();
            }
            return;
          },
        },
      ],
      {cancelable: false},
    );

  const checkVersion = React.useCallback(async () => {
    setUpdateStatus('필수 업데이트 확인 중...');

    try {
      setVersionValid(true);
      setUpdateStatus('필수 업데이트 확인 완료');
      setTimeout(() => {
        onStartSync();
      }, 500);
    } catch (error) {
      if (error.response?.status === 401) {
      } else if (error.response?.status / 100 === 5) {
        AppQuitAlert('서버 점검 중입니다.');
        setVersionValid(false);
      } else {
        AppQuitAlert('네트워크 오류');
        setVersionValid(false);
      }
    }
  }, [versionValid]);

  const checkCodePushUpdate = React.useCallback(_status => {
    switch (_status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setUpdateStatus('패키지 업데이트 확인 중...');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setUpdateStatus('패키지 다운로드 중...');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        setUpdateStatus('사용자 응답 기다리는 중...');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setUpdateStatus('업데이트 설치 중...');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        setUpdateStatus('최신 버전이에요!');
        setTimeout(async () => {
          navigation.replace(
            is_app_lock && isAuth ? 'LockPasswordScreen' : 'BottomNavigation',
          );
        }, 500);
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        setUpdateStatus("업데이트 설치 완료{'\n'}앱이 재실행됩니다.");
        setTimeout(() => {}, 500);
        break;
      default:
        break;
    }
  }, []);

  return (
    <S.ScreenWrapper>
      <S.ImageBackground>
        <S.LoadingWrapper>
          {updateStatus !== '최신 버전이에요!' && (
            <S.IndicatorWrapper>
              <ActivityIndicator color="#F3A986" />
            </S.IndicatorWrapper>
          )}
          <S.LoadingText>{updateStatus}</S.LoadingText>
          <S.LoadingProgressText>
            {updateProgress && `${(Number(updateProgress) * 100).toFixed(0)}%`}
          </S.LoadingProgressText>
        </S.LoadingWrapper>
      </S.ImageBackground>
    </S.ScreenWrapper>
  );
};

export default SplashScreen;

const S = {};

S.IndicatorWrapper = styled.View`
  margin-right: 6px;
`;

S.ImageBackground = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

S.ScreenWrapper = styled.View`
  flex: 1;
`;

S.LoadingWrapper = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  height: 48px;
  width: 240px;
`;

S.LoadingText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.g2};
`;

S.LoadingProgressText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.g2};
`;
