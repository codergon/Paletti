import {Camera} from 'react-native-vision-camera';
import {Alert, Linking} from 'react-native';

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
