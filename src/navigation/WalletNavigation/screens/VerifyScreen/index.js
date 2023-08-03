import {ButtonL, HeaderL, InputL, St, Sv} from 'components/index';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {InputAccountSection} from './sections/InputAccountSection';
import {VerifyAccountSection} from './sections/VerifyAccountSection';

export const VerifyScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');

  const [selectedSection, setSelectedSection] = useState(0);

  const [certificationId, setCertificationId] = useState('');

  return (
    <S.Container>
      {isBankModalVisible && <S.ModalOverlay />}
      {selectedSection === 0 && (
        <InputAccountSection
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          isBankModalVisible={isBankModalVisible}
          setIsBankModalVisible={setIsBankModalVisible}
          setSelectedSection={setSelectedSection}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          setCertificationId={setCertificationId}
        />
      )}
      {selectedSection === 1 && (
        <VerifyAccountSection
          setSelectedSection={setSelectedSection}
          certificationId={certificationId}
        />
      )}
    </S.Container>
  );
};

const S = {};

S.Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

S.ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
