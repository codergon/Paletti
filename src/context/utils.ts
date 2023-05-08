import {Camera} from 'react-native-vision-camera';
import {Alert, Linking} from 'react-native';
import chroma from 'chroma-js';

export const isValidColor = (color: string) => {
  return chroma.valid(color) && (color.length === 7 || color.length === 4);
};

export const requestCameraAccess = async () => {
  try {
    const result = await Camera.requestCameraPermission();
    if (result === 'authorized') {
      return true;
    } else {
      await Linking.openSettings();
      return false;
    }
  } catch (e) {
    Alert.alert(
      'Failed to request permission!',
      'Failed to request Camera permission. Please verify that you have granted Camera Permission in your Settings app.',
    );
    await Linking.openSettings();
    return false;
  }
};
