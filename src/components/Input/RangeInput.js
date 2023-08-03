import {Sv, St, ButtonS} from 'components';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const SelectableItem = ({value = 0, ntrpMin, ntrpMax, onPress}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (value >= ntrpMin && value <= ntrpMax) {
      setSelected(true);
    } else if (value < ntrpMin || value > ntrpMax) {
      setSelected(false);
    }
  }, [ntrpMin, ntrpMax]);
  return (
    <Sv act f={1}>
      <St c3>{value.toFixed(1)}</St>
      <Sv row jsb w={`100%`}>
        <Sv h={8} w={1} bg={colors.g6} />
        <Sv h={8} w={0} bg={colors.g6} />
      </Sv>
      <Sv
        as={TouchableOpacity}
        act
        col
        w={`100%`}
        px={1}
        onPress={onPress && onPress}>
        <Sv h={24} w={`100%`} bg={selected ? colors.primary : '#DDD5FA'} />
        <Sv h={2} w={`100%`} bg={colors.g5} mt={1} />
      </Sv>
    </Sv>
  );
};

export const RangeInput = ({
  onPress,
  style,
  hasTitle = true,
  title = 'title',
  ntrpMin,
  ntrpMax,
  setNtrpMin,
  setNtrpMax,
}) => {
  const handleValue = currentValue => {
    if (ntrpMax == undefined) {
      setNtrpMin(currentValue);
      setNtrpMax(currentValue);
    } else if (ntrpMin == ntrpMax) {
      setNtrpMax(currentValue);
      if (currentValue < ntrpMin) {
        setNtrpMin(currentValue);
      }
    } else {
      setNtrpMin(currentValue);
      setNtrpMax(currentValue);
    }
  };

  const resetValue = () => {
    setNtrpMin(null);
    setNtrpMax(null);
  };

  return (
    <Container onPress={onPress && onPress} style={style}>
      <Sv act row jsb>
        {hasTitle && (
          <St c3 g2>
            {title}
          </St>
        )}
        <Sv p={4} px={8} as={TouchableOpacity} onPress={resetValue}>
          <St c3 primary>
            초기화
          </St>
        </Sv>
      </Sv>

      <Sv row aed mt={16}>
        <Sv w={16} h={27} bg={colors.g6} />
        <SelectableItem
          value={1.0}
          onPress={() => handleValue(1.0)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
        <SelectableItem
          value={1.5}
          onPress={() => handleValue(1.5)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
        <SelectableItem
          value={2.0}
          onPress={() => handleValue(2.0)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
        <SelectableItem
          value={2.5}
          onPress={() => handleValue(2.5)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
        <SelectableItem
          value={3.0}
          onPress={() => handleValue(3.0)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
        <SelectableItem
          value={3.5}
          onPress={() => handleValue(3.5)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
        <SelectableItem
          value={4.0}
          onPress={() => handleValue(4.0)}
          ntrpMin={ntrpMin}
          ntrpMax={ntrpMax}
        />
      </Sv>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const S = {};

S.InputWrapper = styled.View``;
