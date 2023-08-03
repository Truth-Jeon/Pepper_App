import moment from 'moment';
import React, {useEffect, useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {colors} from 'styles/colors';
import {Sv, St} from 'components/index';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export const CustomCalendar = ({date, setDate}) => {
  const onDateChange = date => {
    setDate(moment(date).format('YYYY-MM-DD'));
  };

  return (
    <Sv>
      <CalendarPicker
        initialDate={date}
        selectedStartDate={date}
        onDateChange={onDateChange}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor={colors.primary}
        selectedDayTextColor="white"
        dayLabelsWrapper={{borderColor: 'white'}}
        dayOfWeekStyles={{color: 'pink'}}
        minDate={moment()}
        weekdays={['일', '월', '화', '수', '목', '금', '토']}
        months={[
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월',
        ]}
        previousTitle="  이전"
        nextTitle="다음  "
      />
    </Sv>
  );
};

const selectOption = {
  selected: true,
  startingDay: true,
  endingDay: true,
  color: '#BAA5FD',
  textColor: colors.g2,
};

const startOption = {
  startingDay: true,
  color: '#BAA5FD',
};
const endOption = {
  selected: true,
  endingDay: true,
  color: '#BAA5FD',
  textColor: colors.g2,
};
const middleOption = {color: '#D8CDFE'};

export const RangeCalendar = ({dateRange, setDateRange}) => {
  const [firstFlag, setFirstFlag] = useState(true);
  const [markDateArray, setMarkDateArray] = useState({});

  const onDayPress = day => {
    // console.log('select', day);
    let rangeJson = {};
    const selectMoment = moment(day.dateString);
    const dateArray = Object.keys(dateRange);
    console.log('date array\n', dateArray);
    const zeroMoment = moment(dateArray[0], 'YYYY-MM-DD');
    let oneMoment = moment(dateArray[0], 'YYYY-MM-DD');
    if (dateArray.length == 2) oneMoment = moment(dateArray[1], 'YYYY-MM-DD');
    console.log('asdfsadf\n', selectMoment, zeroMoment, oneMoment);
    let startMoment, endMoment;
    // console.log(
    //   '일 차이: ',
    //   moment.duration(oneMoment.diff(zeroMoment)).asDays(),
    // );
    // dateRange에서 startDate와 endDate를 정해준다.
    if (moment.duration(oneMoment.diff(zeroMoment)).asDays() > 0) {
      startMoment = zeroMoment;
      endMoment = oneMoment;
    } else {
      startMoment = oneMoment;
      endMoment = zeroMoment;
    }
    console.log(startMoment, endMoment);
    if (firstFlag) {
      // 시작일을 정하는 구간
      rangeJson[moment(selectMoment).format('YYYY-MM-DD')] = selectOption;
      setMarkDateArray({});
      setFirstFlag(false);
    } else {
      // 끝나는 날자를 정하는 구간
      if (moment.duration(selectMoment.diff(startMoment)).asDays() > 0) {
        // 일반적인 경우
        rangeJson[moment(startMoment).format('YYYY-MM-DD')] = startOption;
        rangeJson[moment(selectMoment).format('YYYY-MM-DD')] = endOption;
        setFirstFlag(true);
      } else if (
        moment.duration(selectMoment.diff(startMoment)).asDays() == 0
      ) {
        console.log('here!');
        rangeJson[moment(selectMoment).format('YYYY-MM-DD')] = selectOption;
        rangeJson[moment(selectMoment).format('YYYY-MM-DD')] = selectOption;
      } else {
        // 두번째를 앞으로 정한 경우
        rangeJson[moment(startMoment).format('YYYY-MM-DD')] = endOption;
        rangeJson[moment(selectMoment).format('YYYY-MM-DD')] = startOption;
        setFirstFlag(true);
      }
      // makeMarkDateValue();
      // setFirstFlag(true);
    }
    setDateRange(rangeJson);
  };
  const makeMarkDateValue = () => {
    let rangeJson = {};

    const dateArray = Object.keys(dateRange);
    if (dateArray.length > 1) {
      // console.log('date array\n', dateArray);
      const zeroMoment = moment(dateArray[0]);
      const oneMoment = moment(dateArray[1]);
      let startMoment, endMoment;
      // console.log(
      //   '일 차이: ',
      //   moment.duration(oneMoment.diff(zeroMoment)).asDays(),
      // );
      // dateRange에서 startDate와 endDate를 정해준다.
      if (moment.duration(oneMoment.diff(zeroMoment)).asDays() > 0) {
        startMoment = zeroMoment;
        endMoment = oneMoment;
      } else {
        startMoment = oneMoment;
        endMoment = zeroMoment;
      }
      let i;
      let curMoment = startMoment;
      for (
        i = 0;
        moment.duration(endMoment.diff(curMoment)).asDays() > 0;
        i++
      ) {
        if (i == 0) {
          rangeJson[moment(curMoment).format('YYYY-MM-DD')] = startOption;
        } else {
          rangeJson[moment(curMoment).format('YYYY-MM-DD')] = middleOption;
        }
        curMoment = moment(curMoment).add(1, 'days');
      }
      rangeJson[moment(curMoment).format('YYYY-MM-DD')] = endOption;
      // console.log('range Arr', rangeJson);

      setMarkDateArray(rangeJson);
    } else {
      setMarkDateArray(dateRange);
    }
  };

  useEffect(() => {
    // console.log('effect dateRange', dateRange);
    if (firstFlag) makeMarkDateValue();
  }, [dateRange, firstFlag]);

  return (
    <Calendar
      monthFormat="M월"
      onDayPress={onDayPress}
      markingType={'period'}
      markedDates={firstFlag ? markDateArray : dateRange}
      style={{paddingLeft: 1, paddingRight: 1}}
      theme={{
        arrowColor: colors.g2,
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: '#FB5046',
          },
        },
      }}
    />
  );
};
