import React from 'react';
import {List} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Image,
  // TouchableWithoutFeedback,
} from 'react-native';
import n from 'helper/normalize';
import styled from 'styled-components';
import {colors} from 'styles/colors';
import {St, Sv} from 'components/index';
import IcStar24 from 'images/IcStar24.svg';
import IcStarYellow24 from 'images/IcStarYellow24.svg';
import IcArrowDown from 'images/IcArrowDown.svg';
import {useNavigation} from '@react-navigation/native';
import dummy from 'images/Dummy.png';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

export const AccordionList = ({
  onPress,
  image,
  title = '',
  즐겨찾기상태,
  handle즐겨찾기,
  expanded,
}) => {
  const navigation = useNavigation();

  // const [expanded, setExpanded] = React.useState(true);

  // const handlePress = () => setExpanded(!expanded);
  return (
    <Sv style={{position: 'relative'}}>
      <List.Section>
        <List.Accordion
          expanded={expanded}
          style={{backgroundColor: colors.white}}
          titleStyle={{fontSize: 14}}
          title={title}
          onPress={onPress && onPress}
          left={props => <Sv style={{width: 26, height: 20}} />}
          right={props => (
            <Sv>
              <IcArrowDown />
            </Sv>
          )}>
          {image ? (
            <S.Image source={{uri: image}} />
          ) : (
            <S.Image source={dummy} resizeMode="cover" />
          )}
        </List.Accordion>
        <Sv h={1} bg={colors.white} />
      </List.Section>
      <S.StarContainer>
        {즐겨찾기상태 ? (
          <Sv px={4} as={TouchableOpacity} onPress={handle즐겨찾기}>
            <IcStarYellow24 />
          </Sv>
        ) : (
          <Sv px={4} as={TouchableOpacity} onPress={handle즐겨찾기}>
            <IcStar24 />
          </Sv>
        )}
      </S.StarContainer>
    </Sv>
  );
};

const S = {};

S.Image = styled.Image`
  background-color: ${colors.g4};
  height: ${n(224)}px;
  margin: ${n(16)}px ${n(16)}px;
  width: 90%;
  resize-mode: cover;
`;
S.StarContainer = styled.TouchableOpacity`
  position: absolute;
  left: 2px;
  top: 20px;
  z-index: 100;
`;
