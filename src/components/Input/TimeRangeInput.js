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
import n from 'helper/normalize';

const SelectableItem = ({value = 0, startTime, endTime, onPress}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (value > startTime && value <= endTime) {
      setSelected(true);
    } else if (value <= startTime || value > endTime) {
      setSelected(false);
    }
  }, [startTime, endTime]);
  return (
    <Sv act jed w={36} h={50}>
      <S.TimeWrapper>
        <St c3>{value}</St>
      </S.TimeWrapper>
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

const timeArr = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '23:59',
];

export const TimeRangeInput = ({
  onPress,
  style,
  hasTitle = true,
  title = 'title',
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const handleValue = currentIndex => {
    // if (endTime == undefined) {
    //   setStartTime(currentValue);
    //   setEndTime(currentValue);
    // } else if (startTime == endTime) {
    //   setEndTime(currentValue);
    // } else {
    //   setStartTime(currentValue);
    //   setEndTime(currentValue);
    // }
    if (timeArr[currentIndex - 1] < startTime) {
      setStartTime(timeArr[currentIndex - 1]);
      setEndTime(timeArr[currentIndex]);
    } else if (timeArr[currentIndex] > endTime) {
      setEndTime(timeArr[currentIndex]);
    } else {
      setStartTime(timeArr[currentIndex - 1]);
      setEndTime(timeArr[currentIndex]);
    }
  };

  useEffect(() => {
    if (startTime?.substr(0, 2) > endTime?.substr(0, 2)) {
      setStartTime(undefined);
      setEndTime(undefined);
    }
  }, [startTime, endTime]);

  return (
    <Sv>
      {hasTitle && (
        <St c3 g2 mb={4}>
          {title}
        </St>
      )}

      <Sv row aed mt={8} h={50}>
        <Sv w={16} h={27} bg={colors.g6} />
        <ScrollView
          horizontal={true}
          contentOffset={{x: 410}}
          showsHorizontalScrollIndicator={false}
          style={{overflow: 'visible'}}>
          <S.FirstTime>
            <St c3>00:00</St>
          </S.FirstTime>
          {timeArr.map((v, i) => (
            <>
              {i !== 0 && (
                <SelectableItem
                  value={v}
                  onPress={() => handleValue(i)}
                  startTime={startTime}
                  endTime={endTime}
                />
              )}
            </>
          ))}
          <Sv w={40} />
        </ScrollView>
      </Sv>
    </Sv>
  );
};

const Container = styled.View`
  width: 100%;
`;

const S = {};

S.InputWrapper = styled.View``;

S.TimeWrapper = styled.View`
  position: absolute;
  bottom: ${n(36)}px;
  left: ${n(22)}px;
`;

S.FirstTime = styled.View`
  position: absolute;
  bottom: ${n(36)}px;
  left: ${n(-14)}px;
`;
