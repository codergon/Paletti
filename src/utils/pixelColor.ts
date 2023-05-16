import {NativeModules} from 'react-native';
const {PixelColor: PixelColorModule} = NativeModules;

type Callback = (width: number, height: number) => void;

interface PixelColorInterface {
  setImage(imageUri: string, callback?: Callback): void;
  getPixelColor(x: number, y: number): Promise<string>;
  getImageSize(callback?: (width: number, height: number) => void): void;
}

const PixelColor: PixelColorInterface = {
  setImage: (imageUri, callback) => {
    try {
      PixelColorModule.setImage(imageUri, callback ?? (() => {}));
    } catch (error) {
      throw new Error('Error setting image');
    }
  },
  getPixelColor: async (x, y) => {
    const result = await PixelColorModule.getPixelColor(
      x,
      isNaN(y as number) ? x : y,
    ).then((color: string) => {
      return color;
    });

    return result ?? '';
  },
  getImageSize: callback => {
    PixelColorModule.getImageSize(callback ?? (() => {}));
  },
};

export default PixelColor;
export const {setImage, getPixelColor} = PixelColor;
