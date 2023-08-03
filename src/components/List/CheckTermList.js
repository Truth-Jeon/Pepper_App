import React from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;

export const CheckTermList = ({
  disabled,
  value,
  onValueChange,
  title = '',
  setIsVisible,
  terms = {},
}) => {
  const navigation = useNavigation();
  const handleOpenTermDetail = term => {
    navigation.navigate('CloseTermDetailScreen', {term});
    setIsVisible(false);
  };
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        style={styles.checkStyle}
        boxType="square"
      />
      <Text style={styles.titles}>{title}</Text>
      <Text style={styles.showAll} onPress={() => handleOpenTermDetail(terms)}>
        전체보기
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    width: width - 40,
    alignItems: 'center',
  },
  collapse: {
    width: width - 40,
  },
  accordStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
  },
  titles: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 3,
  },
  contents: {
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  checkStyle: {
    flex: 0.5,
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
  },
  showAll: {
    flex: 1,
  },
});
