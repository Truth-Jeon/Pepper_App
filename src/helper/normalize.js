import {Dimensions, PixelRatio} from 'react-native';

export const {height: originHeight, width: originWidth} =
  Dimensions.get('window');

const scale = originWidth / 375;

//normalize를 효율적으로 쓰기 위해 n으로 변경했습니다.
const n = size => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize) * 100) / 100;
};

export default n;

const width = 375;
const height = originHeight / scale;

const getOriginSize = size => (size * 375) / originWidth;

export {height, width, getOriginSize};
