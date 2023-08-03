import n from 'helper/normalize';
import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';

export const ModalSlide = ({
  isVisible,
  setIsVisible,
  renderComponent,
  isPressable = true,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsVisible(false)}>
      <S.Container
        as={Pressable}
        onPress={isPressable ? () => setIsVisible(false) : null}>
        <S.Pressable onPress={() => setIsVisible(false)} />
        <S.ModalWrapper style={{}}>
          {typeof renderComponent === 'object'
            ? renderComponent
            : renderComponent()}
        </S.ModalWrapper>
      </S.Container>
    </Modal>
  );
};

const S = {};

S.Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 100;
`;

S.ModalWrapper = styled.View`
  padding: ${n(20)}px ${n(22)}px;
  padding-bottom: ${n(44)}px;
  background-color: ${colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

S.Pressable = styled.Pressable`
  flex: 1;
  background-color: transparent;
`;
