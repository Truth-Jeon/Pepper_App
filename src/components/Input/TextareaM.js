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
} from 'react-native';
import n from 'helper/normalize';

export const TextareaM = ({
  onPress,
  style,
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
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container onPress={onPress && onPress} style={style}>
      {hasTitle && (
        <St c3 g2 mb={8}>
          {title}
        </St>
      )}

      <S.InputWrapper>
        <S.Input
          textAlignVertical="top"
          editable={editable}
          multiline
          placeholder={placeholder}
          placeholderTextColor={colors.g4}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText && onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}></S.Input>
        {hasButton && (
          <S.ButtonWrapper>
            <ButtonS title={buttonText} line disabled={buttonDisabled} />
          </S.ButtonWrapper>
        )}
      </S.InputWrapper>
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
  width: 100%;
  font-size: 14px;
  border: 1px solid ${colors.g5};
  height: ${n(140)}px;
  padding: ${n(12)}px;
  border-radius: ${n(8)}px;
  color: ${colors.black};
`;

S.ButtonWrapper = styled.View`
  position: absolute;
  right: 3px;
  top: 3px;
`;
