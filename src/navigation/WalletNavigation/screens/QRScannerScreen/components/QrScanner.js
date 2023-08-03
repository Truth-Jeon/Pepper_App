'use strict';
import React from 'react';
import {Linking} from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
import styled from 'styled-components';
import n from 'helper/normalize';
import {Camera, CameraType} from 'react-native-camera-kit';

import {ButtonL, HeaderM} from 'components/index';

export const QRScanner = () => {
  const [scanUrl, setScanUrl] = React.useState('');
  return (
    <>
      <HeaderM title="QR 스캔" />
      <Camera
        ref={ref => (QRScanner.camera = ref)}
        cameraType={CameraType.Back}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: '100%',
        }}
        scanBarcode={true}
        onReadCode={event => {
          if (scanUrl !== event.nativeEvent.codeStringValue) {
            console.log('스캔!!', event.nativeEvent.codeStringValue);
            setScanUrl(
              `${event.nativeEvent.codeStringValue}?transaction_type=trans&isMarket=false`,
            );
          }
        }}
        showFrame={true}
      />
      {scanUrl.length > 0 && (
        <S.ButtonContainer>
          <ButtonL title="이동하기" onPress={() => Linking.openURL(scanUrl)} />
        </S.ButtonContainer>
      )}
    </>
  );
};

const S = {};

S.ButtonContainer = styled.View`
  position: absolute;
  bottom: ${n(16)}px;
  right: 0;
  left: 0;

  padding: 0 ${n(22)}px;
`;
