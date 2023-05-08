import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  appWidth: width - 40,
  isSmallDevice: width < 375,
};

export const ELEM_HEIGHT = 50;
