import {ButtonL, HeaderL, St, Sv} from 'components/index';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, Platform} from 'react-native';
import styled from 'styled-components';
import ImgAppStore from 'images/png/img-appstore.png';
import IcGooglePlay from 'images/svg/ic-googleplay.svg';
import n from 'helper/normalize';
import DeviceInfo from 'react-native-device-info';
import {getRequest} from 'apis/common';

export const VersionInfoScreen = ({navigation}) => {
  const [versionInfo, setVersionInfo] = useState();

  const goBack = () => {
    navigation.goBack();
  };

  const getRecentVersion = async () => {
    try {
      const result = await getRequest('/v1/board/version/', {
        device_os: Platform.OS,
      });
      console.log('get version', result);
      setVersionInfo(result.result);
    } catch (e) {}
  };

  useEffect(() => {
    getRecentVersion();
  }, []);

  return (
    <S.Container>
      <HeaderL title="버전 정보" />
      <Sv f={1} act jct pb={40}>
        {Platform.OS == 'ios' ? (
          <S.StoreImage source={ImgAppStore} />
        ) : (
          <IcGooglePlay width={n(110)} height={n(110)} />
        )}
        <St b1 g1>
          설치버전 {DeviceInfo.getVersion()}
        </St>
        <St b1 g1>
          최신버전 {versionInfo?.version}
        </St>
      </Sv>
      <Sv px={18} pb={16}>
        <ButtonL title="확인" onPress={goBack} />
      </Sv>
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

S.StoreImage = styled(Image)`
  width: ${n(110)}px;
  height: ${n(110)}px;
`;
