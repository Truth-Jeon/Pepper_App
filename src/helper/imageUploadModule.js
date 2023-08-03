import {Alert, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';

const openSettingAlert = alertText =>
  Alert.alert(
    null,
    alertText,
    [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '설정',
        onPress: () => openSettings(),
      },
    ],
    {
      cancelable: false,
    },
  );

export const askPermissionGralleyAndroid = async (
  alertText = `사진 업로드 기능을 사용하려면${'\n'}'앨범' 접근권한을 허용해야 합니다.`,
) => {
  try {
    const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    openSettingAlert(alertText);
    return false;
  } catch (error) {
    Alert.alert('앨범 접근 권한 설정에 실패했습니다.');
    return false;
  }
};

export const askPermissionGralleyIos = async (
  alertText = `사진 업로드 기능을 사용하려면${'\n'}'갤러리' 접근권한을 허용해야 합니다.`,
) => {
  try {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    openSettingAlert(alertText);
    return false;
  } catch (error) {
    Alert.alert('갤러리 접근 권한 설정에 실패했습니다.');
    return false;
  }
};

export const askPermissionCameraAndroid = async (
  alertText = `사진 촬영 기능을 사용하려면${'\n'}'카메라' 접근권한을 허용해야 합니다.`,
) => {
  try {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    openSettingAlert(alertText);
    return false;
  } catch (error) {
    Alert.alert('앨범 접근 권한 설정에 실패했습니다.');
    return false;
  }
};

export const askPermissionCamerayIos = async (
  alertText = `사진 촬영 기능을 사용하려면${'\n'}'카메라' 접근권한을 허용해야 합니다.`,
) => {
  try {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    openSettingAlert(alertText);
    return false;
  } catch (error) {
    Alert.alert('갤러리 접근 권한 설정에 실패했습니다.');
    return false;
  }
};

const trimImage = (image, userUUID, index) => {
  const filename = `${userUUID
    .replace('-', '')
    .slice(0, 10)}-${new Date().getTime()}-${index}.${image.mime
    .split('/')
    .pop()}`;

  console.log('trimImage', image);

  const photoObj = {
    uri: image.path,
    type: image.mime,
    name: filename,
    size: image.size,
  };
  return photoObj;
};

const checkPermission = async isGallary => {
  if (isGallary) {
    if (Platform.OS === 'ios') {
      return await askPermissionGralleyIos();
    } else {
      return await askPermissionGralleyAndroid();
    }
  } else {
    if (Platform.OS === 'ios') {
      return await askPermissionCamerayIos();
    } else {
      return await askPermissionCameraAndroid();
    }
  }
};

const imageUploadModule = async (
  multiple = true,
  cropping = false,
  imageMaxSize = 1,
  currentImage,
  userUUID = '',
  isGallary = true,
  maxWidth = 2000,
  maxHeight = 2000,
) => {
  const permissionsResult = await checkPermission(isGallary);
  if (!permissionsResult) {
    return;
  }

  let newImageCount = 0;
  if (Array.isArray(currentImage)) {
    if (currentImage.length >= imageMaxSize) {
      Alert.alert(`사진은 최대 ${imageMaxSize}개 이하만 첨부 가능합니다.`);
      return;
    }
    newImageCount = currentImage.length;
  }

  try {
    let newImage;
    if (isGallary) {
      newImage = await ImagePicker.openPicker({
        mediaType: 'photo',
        forceJpg: true,
        multiple,
        cropping,
        maxFiles: imageMaxSize - newImageCount,
        width: maxWidth,
        heihgt: maxHeight,
        compressImageMaxWidth: maxWidth,
        compressImageMaxHeight: maxHeight,
      });
    } else {
      newImage = await ImagePicker.openCamera({
        mediaType: 'photo',
        forceJpg: true,
        cropping,
        width: maxWidth,
        heihgt: maxHeight,
        compressImageMaxWidth: maxWidth,
        compressImageMaxHeight: maxHeight,
      });
    }

    if (Array.isArray(newImage)) {
      // multiple : true
      newImageCount += newImage.length;
    } else {
      // multiple : false
      newImageCount += 1;
    }

    if (newImageCount > imageMaxSize) {
      Alert.alert(`사진은 최대 ${imageMaxSize}개 이하만 첨부 가능합니다.`);
      return;
    }

    if (Array.isArray(newImage)) {
      const imageFiles = newImage.map((image, index) => {
        return trimImage(image, userUUID, index);
      });
      return imageFiles;
    } else {
      return trimImage(newImage, userUUID, 0);
    }
  } catch (error) {
    console.log(error);
  }
};

export default imageUploadModule;
