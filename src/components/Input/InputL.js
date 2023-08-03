import {Sv, St, ButtonS} from 'components';
import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

export const InputL = ({
  onPress,
  style,
  placeholder = '',
  hasCaption = false,
  caption = '',
  redCaption,
  hasButton,
  buttonText = '',
  value,
  autoFocus,
  onChangeText,
  maxLength,
  numberType = false,
  editable = true,
  onPressButton = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container onPress={onPress && onPress} style={style}>
      <S.InputWrapper>
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={colors.g4}
          autoFocus={autoFocus}
          value={value}
          editable={editable}
          onChangeText={onChangeText && onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          keyboardType={
            numberType
              ? Platform.OS === 'android'
                ? 'numeric'
                : 'number-pad'
              : 'default'
          }
        />
        {hasButton && (
          <S.ButtonWrapper as={TouchableOpacity} onPress={onPressButton}>
            <St c1 primary>
              {buttonText}
            </St>
            {/* <ButtonS title={buttonText} line disabled={buttonDisabled} /> */}
          </S.ButtonWrapper>
        )}
      </S.InputWrapper>
      <Sv h={2} bg={isFocused ? colors.primary : colors.g5} />
      {hasCaption && (
        <>
          {redCaption ? (
            <St c2 red mt={4}>
              {caption}
            </St>
          ) : (
            <Sv row jsb>
              <St c2 g3 mt={6}>
                {caption}
              </St>
              <St c2 g3 mt={6}>
                {value?.length}/{maxLength}
              </St>
            </Sv>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const S = {};

S.InputWrapper = styled.View`
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

S.Input = styled.TextInput`
  border: none;
  width: 100%;
  font-size: 24px;
  margin-bottom: ${Platform.OS == 'ios' ? 6 : 0}px;
  color: ${colors.black};
  height: 50px;
`;

S.ButtonWrapper = styled.View`
  position: absolute;
  right: -16px;
  top: 0px;
  padding: 16px;
`;
