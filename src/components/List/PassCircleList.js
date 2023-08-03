import React from 'react';
import IcPassCircleGray from 'images/svg/ic-pass-circle-gray.svg';
import IcPassCircleGreen from 'images/svg/ic-pass-circle-green.svg';
import {Sv} from 'components/index';

export const PassCircleList = ({value}) => {
  return (
    <Sv row>
      {value?.map((e, i) =>
        e >= 0 ? (
          <Sv mr={i != value.length - 1 ? 18 : 0}>
            <IcPassCircleGreen />
          </Sv>
        ) : (
          <Sv mr={i != value.length - 1 ? 18 : 0}>
            <IcPassCircleGray />
          </Sv>
        ),
      )}
    </Sv>
  );
};
