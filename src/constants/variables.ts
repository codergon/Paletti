import {BlurView} from '@react-native-community/blur';
import {Platform} from 'react-native';
import Reanimated from 'react-native-reanimated';

export const IS_IOS = Platform.OS === 'ios';
export const BlurredView = IS_IOS
  ? Reanimated.createAnimatedComponent(BlurView)
  : Reanimated.View;
