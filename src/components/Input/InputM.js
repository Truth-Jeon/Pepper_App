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
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';

export const InputM = ({
  onPress,
  hasTitle = true,
  title = '',
  placeholder = '',
  hasCaption = false,
  caption = '',
  redCaption,
  hasButton,
  buttonText = '',
  buttonDisabled,
  onChange,
  value,
  setValue,
  autoFocus,
  onChangeText,
  asButton,
  disabled,
  maxLength,
  numberType,
  onFocus,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container>
      {hasTitle && (
        <St c3 g2 mb={8}>
          {title}
        </St>
      )}

      <S.InputWrapper>
        {asButton ? (
          <Sv as={TouchableOpacity} w={`100%`} onPress={onPress && onPress}>
            <Sv pointerEvents="none">
              <S.ButtonInput
                placeholder={placeholder}
                placeholderTextColor={colors.primary}
              />
            </Sv>
          </Sv>
        ) : (
          <S.Input
            placeholder={placeholder}
            placeholderTextColor={colors.g4}
            autoFocus={autoFocus}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText && onChangeText}
            onFocus={e => {
              if (onFocus) onFocus(e);
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            maxLength={maxLength}
            keyboardType={
              numberType &&
              (Platform.OS == 'android' ? 'numeric' : 'number-pad')
            }
          />
        )}

        {hasButton && (
          <S.ButtonWrapper>
            <ButtonS title={buttonText} line disabled={buttonDisabled} />
          </S.ButtonWrapper>
        )}
      </S.InputWrapper>
      <Sv h={2} bg={isFocused ? colors.primary : colors.g5} />
      {hasCaption && (
        <>
          {redCaption ? (
            <St c3 red mt={4}>
              {caption}
            </St>
          ) : (
            <St c3 primary mt={4}>
              {caption}
            </St>
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
  font-size: 20px;
  margin-bottom: ${Platform.OS == 'ios' ? 4 : 0}px;
  color: ${colors.g0};
`;

S.ButtonInput = styled.TextInput`
  border: none;
  width: 100%;
  font-size: 20px;
  margin-bottom: ${Platform.OS == 'ios' ? 4 : 0}px;
  color: ${colors.black};
`;

S.ButtonWrapper = styled.View`
  position: absolute;
  right: 3px;
  top: 3px;
`;
