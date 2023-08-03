import {Sv, St} from 'components/index';
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import IcStar from 'images/svg/ic-star.svg';
import {colors} from 'styles/colors';
import styled from 'styled-components';

export const AccountList = ({
  name,
  comment,
  isFavorate,
  isHistory,
  historyPrice,
  onPressStar,
  onPress,
}) => {
  return (
    <Sv as={TouchableOpacity} mt={22} onPress={onPress}>
      <Sv row jsb>
        <S.LeftContainer>
          <St s2>{name}</St>
          <Sv row>
            <Sv>
              <St c2 g3 mt={5}>
                {comment}
              </St>
            </Sv>
          </Sv>
        </S.LeftContainer>
        {isHistory ? (
          <Sv act jct>
            <St s2 primary={historyPrice > 0} g3={historyPrice < 0}>
              {historyPrice > 0
                ? `+${historyPrice?.toLocaleString()}`
                : historyPrice?.toLocaleString()}
            </St>
          </Sv>
        ) : (
          <Sv act jct>
            <TouchableOpacity onPress={onPressStar}>
              <IcStar color={isFavorate ? colors.primary : colors.g5} />
            </TouchableOpacity>
          </Sv>
        )}
      </Sv>
    </Sv>
  );
};

const S = {};

S.LeftContainer = styled.View`
  max-width: 90%;
`;
