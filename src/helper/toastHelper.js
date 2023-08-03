import Toast from 'react-native-toast-message';

export const toastShowTop = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'top',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export const toastShowBottom = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'bottom',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};
