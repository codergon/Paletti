import type {Frame} from 'react-native-vision-camera';

export interface RGBA {
  // r: number;
  // g: number;
  // b: number;
  // a: number;

  hexString: string;
}

// Frame Processor Plugin name
declare global {
  var __getColor: (frame: Frame) => RGBA | undefined | null | any;
}

export function getColor(frame: Frame): RGBA | undefined | null | any {
  'worklet';
  return __getColor(frame);
}
