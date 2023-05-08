import {NativeModules} from 'react-native';
const {PixelColor: PixelColorModule} = NativeModules;

type SetImageCallback = (width: number, height: number) => void;

interface ImagePixelInterface {
  setImage(imageUri: string, callback?: SetImageCallback): void;
  getPixelColor(x: number, y: number): Promise<string>;
  getImageSize(callback?: (width: number, height: number) => void): void;
  getConstants(): {
    [key: string]: any;
  };
}

const PixelColor: ImagePixelInterface = {
  setImage: (imageUri, callback) => {
    PixelColorModule.setImage(imageUri, callback ?? (() => {}));
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
    PixelColorModule.getImageSize(
      callback ??
        ((width: number, height: number) => {
          console.log(`Image size: ${width} x ${height}`);
        }),
    );
  },
  getConstants: () => {
    return PixelColorModule.getConstants();
  },
};

export default PixelColor;
export const {setImage, getPixelColor, getConstants} = PixelColor;
