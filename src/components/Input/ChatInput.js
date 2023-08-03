import {Sv, St} from 'components';
import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import n from 'helper/normalize';
import {TouchableOpacity} from 'react-native-gesture-handler';

import IcCheckbox from 'images/IcCheckbox.svg';
import IcCheckboxOn from 'images/IcCheckboxOn.svg';

export const ChatInput = forwardRef((props, ref) => {
  const {
    onPress,
    onPressButton,
    style,
    placeholder = '',
    hasButton = true,
    buttonText = '',
    buttonDisabled,
    onChange,
    value,
    setValue,
    autoFocus,
    onChangeText,
    targetWriter,
    onPressEnter,
    editable = true,
  } = props;
  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container onPress={onPress && onPress} style={style}>
      {/* {hasAnonymous && (
        <Sv
          row
          act
          p={12}
          pr={20}
          as={TouchableOpacity}
          onPress={toggleAnonymous}>
          <St g2 b2 mr={4}>
            익명 댓글
          </St>
          {isAnonymous ? <IcCheckboxOn /> : <IcCheckbox />}
        </Sv>
      )} */}
      <S.InputContainer>
        <S.InputWrapper>
          {targetWriter && (
            <St s4 primary w="80" mr={8}>
              {targetWriter} :
            </St>
          )}

          <S.Input
            textAlignVertical="top"
            placeholder={placeholder}
            placeholderTextColor={colors.g4}
            autoFocus={autoFocus}
            value={value}
            multiline
            onChangeText={onChangeText && onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            // onSubmitEditing={onPressButton}
            ref={ref}
            editable={editable}
          />
        </S.InputWrapper>

        {hasButton && (
          <S.ButtonWrapper>
            {buttonDisabled ? (
              <Sv py={10}>
                <St c1 g4>
                  {buttonText}
                </St>
              </Sv>
            ) : (
              <Sv p={10} as={TouchableOpacity} onPress={onPressButton}>
                <St c1 primary>
                  {buttonText}
                </St>
              </Sv>
            )}
          </S.ButtonWrapper>
        )}
      </S.InputContainer>
    </Container>
  );
});

const Container = styled.View`
  width: 100%;
  background: white;
`;

const S = {};

S.InputContainer = styled.View`
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${n(20)}px;
  padding-right: ${n(8)}px;
  justify-content: space-between;
`;

S.InputWrapper = styled.View`
  max-width: ${n(260)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

S.Input = styled.TextInput`
  border: none;
  font-size: 15px;
  padding: ${n(14)}px 0px;
  width: 100%;
  color: ${colors.black};
`;

S.ButtonWrapper = styled.View``;
