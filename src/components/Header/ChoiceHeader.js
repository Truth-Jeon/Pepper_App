import {Sv, St} from 'components/index';
import n from 'helper/normalize';
import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components';
import {colors} from 'styles/colors';

export const ChoiceHeader = ({
  items = [],
  selectedHeader,
  setSelectedHeader,
  requestTotalCount,
  myTotalCount,
}) => {
  const CountBadge = ({index}) => {
    if (index === 1 && requestTotalCount > 0) {
      return (
        <S.CountBadge>
          <St white s4>
            {requestTotalCount}
          </St>
        </S.CountBadge>
      );
    } else if (index === 2 && myTotalCount > 0) {
      return (
        <S.CountBadge>
          <St white s4>
            {myTotalCount}
          </St>
        </S.CountBadge>
      );
    } else {
      return <></>;
    }
  };
  return (
    <Sv row px={20} pt={36} pb={24}>
      {items.map((e, i) => (
        <>
          <Sv
            act
            jct
            as={Pressable}
            key={i}
            onPress={() => setSelectedHeader(i)}>
            <S.HeaderText isSelected={selectedHeader == i}>{e}</S.HeaderText>
            <CountBadge index={i} />
          </Sv>
          {i != items.length - 1 && (
            <Sv act jct px={12}>
              <Sv w={1} h={16} bg={colors.g5} />
            </Sv>
          )}
        </>
      ))}
    </Sv>
  );
};

const S = {};

S.HeaderText = styled.Text`
  font-size: ${n(26)}px;
  /* font-family: 'Pretendard'; */
  font-style: normal;
  font-weight: 700;
  color: ${({isSelected}) => (isSelected ? colors.g0 : colors.g4)};
`;

S.CountBadge = styled.View`
  position: absolute;
  width: ${n(16)}px;
  height: ${n(16)}px;
  border-radius: ${n(10)}px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  top: -${n(8)}px;
  right: -${n(12)}px;
`;
