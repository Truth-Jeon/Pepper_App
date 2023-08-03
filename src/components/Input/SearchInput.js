import React from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {TouchableOpacity} from 'react-native';
import {Sv, St} from 'components';
import n from 'helper/normalize';
import IcSearch from 'images/png/img-search.png';

export const SearchInput = ({
  onChangeText,
  value,
  onClickSearchButton,
  disabled = false,
  isButton = true,
  placeholder,
}) => {
  return (
    <S.Container>
      <S.SearchIconWrapper>
        <TouchableOpacity onPress={onClickSearchButton}>
          <S.SearchIcon source={IcSearch} />
        </TouchableOpacity>
      </S.SearchIconWrapper>

      <S.Input
        value={value}
        onChangeText={onChangeText && onChangeText}
        disabled={disabled}
        onSubmitEditing={onClickSearchButton}
        placeholder={placeholder}
        placeholderTextColor={colors.g4}
      />

      {isButton && (
        <S.ButtonWrapper>
          <Sv p={0} as={TouchableOpacity} onPress={onClickSearchButton}>
            <St c1 primary>
              검색
            </St>
          </Sv>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

const S = {};

S.Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${colors.black};
  background-color: ${colors.g6};
  border-radius: ${n(10)}px;
  height: ${n(44)}px;
`;

S.SearchIconWrapper = styled.View`
  margin-left: ${n(16)}px;
  margin-right: ${n(8)}px;
`;

S.SearchIcon = styled.Image`
  width: ${n(14.13)}px;
  height: ${n(14.11)}px;
`;

S.Input = styled.TextInput`
  flex: 1;
  border: none;
  font-size: 15px;
  padding: ${n(10)}px 0px;
  color: ${colors.g0};
  background-color: ${colors.g6};
  border-radius: ${n(10)}px;
`;

S.ButtonWrapper = styled.View`
  margin-right: ${n(16)}px;
  margin-left: ${n(8)}px;
`;
