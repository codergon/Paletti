import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Layout from '../constants/Layout';
import PixelColor from '../utils/pixelColor';
import ColorPicker from 'react-native-image-colors';
import {nanoid} from 'nanoid';
import {mapRange} from '../helpers/math';
import {
  SharedValue,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {useAnimatedColor} from '../utils/useAnimatedColor';
import ntc from '../lib/ntc';
import chroma from 'chroma-js';
import {useStore} from './AppContext';
import {
  CameraDevice,
  CameraProps,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {getColor} from '../utils/getColor';
import {AppState} from 'react-native';
import ImageResizer from '@bam.tech/react-native-image-resizer';

type ContextType = {
  imageWidth: number;
  isDominant: boolean;
  imageHeight: number;
  selectedImg: string;
  colorName: SharedValue<string>;
  activeColor: SharedValue<string>;
  cameraDevice: CameraDevice | undefined;
  cameraAnimatedProps: Partial<CameraProps>;
  animatedImageColor: Readonly<SharedValue<string | number>>;

  frameProcessor: any;
  disableFlash: () => void;
  selectImage: () => void;
  removeImage: () => void;
  toggleFlash: () => void;
  addToPreview: () => void;
  torch: CameraProps['torch'];
  toggleAutoExtract: () => void;
  getColorAt: (x: number, y: number) => void;
  setMaxHeight: React.Dispatch<React.SetStateAction<number>>;
};

export const LogicContext = createContext<ContextType>({
  torch: 'off',
  imageWidth: 0,
  imageHeight: 0,
  selectedImg: '',
  isDominant: false,
  colorName: {
    value: '',
  },
  activeColor: {
    value: '',
  },
  animatedImageColor: {
    value: '',
  },
  cameraDevice: undefined,
  frameProcessor: undefined,
  cameraAnimatedProps: {
    isActive: true,
  },

  getColorAt: () => {},
  toggleFlash: () => {},
  selectImage: () => {},
  removeImage: () => {},
  setMaxHeight: () => {},
  addToPreview: () => {},
  disableFlash: () => {},
  toggleAutoExtract: () => {},
});

interface LogicProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const MAX_WIDTH = Layout.window.width - 40;

export default function LogicProvider({children}: LogicProviderProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [imgUri, setImgUri] = useState('');
  const [maxHeight, setMaxHeight] = useState(400);
  const [actualWidth, setActualWidth] = useState(0);
  const [actualHeight, setActualHeight] = useState(0);
  const [isDominant, setIsDominant] = useState(false);
  const [dominantColors, setDominantColors] = useState<any[]>([]);
  const [aspect, setAspect] = useState({
    x: 1,
    y: 1,
  });

  const {updatePreview, addArrayToPreview} = useStore();

  const color = useSharedValue('#000000');
  const colorName = useSharedValue('black');
  const animatedImageColor = useAnimatedColor(color, 200);

  const removeImage = () => {
    setIsDominant(false);
    setImgUri('');
  };

  const getColorAt = async (x = 0, y = 0) => {
    const atX = Math.round(
      mapRange(x, -width / 2, width / 2, 0, width - 1) * aspect.x,
    );
    const atY = Math.round(
      mapRange(y, -height / 2, height / 2, 0, height - 1) * aspect.y,
    );
    const hex = await PixelColor.getPixelColor(atX, atY);
    if (hex) {
      const name = chroma.valid(hex) ? ntc.name(hex) : 'Unknown';
      color.value = hex;
      colorName.value = name;
    }
  };

  const getDominantColors = async (uri = imgUri) => {
    if (!uri) return;

    const result = await ColorPicker.getColors(uri || '', {
      cache: false,
      key: nanoid(),
      fallback: '#228B22',
    });
    const colorResults = Object.values(result).filter(c => chroma.valid(c));
    setDominantColors(colorResults);
  };

  const getDimensions = useCallback(
    (imgWidth = actualWidth, imgHeight = actualHeight) => {
      // Calculate Image Size
      const ratio = imgHeight / imgWidth;
      const minRatio = maxHeight / MAX_WIDTH;

      const calculatedWidth =
        ratio > 1
          ? imgWidth > MAX_WIDTH
            ? ratio < minRatio
              ? MAX_WIDTH
              : maxHeight / ratio
            : imgHeight < maxHeight
            ? imgWidth
            : maxHeight / ratio
          : imgWidth < MAX_WIDTH
          ? imgWidth
          : MAX_WIDTH;

      const calculatedHeight =
        ratio > 1
          ? imgWidth > MAX_WIDTH
            ? ratio < minRatio
              ? MAX_WIDTH * ratio
              : maxHeight
            : imgHeight < maxHeight
            ? imgHeight
            : maxHeight
          : imgWidth < MAX_WIDTH
          ? imgHeight
          : MAX_WIDTH * ratio;

      setAspect({
        x: imgWidth / calculatedWidth,
        y: imgHeight / calculatedHeight,
      });

      setWidth(calculatedWidth);
      setHeight(calculatedHeight);
    },
    [maxHeight],
  );

  const selectImage = async () => {
    launchImageLibrary(
      {
        quality: 1,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        presentationStyle: 'fullScreen',
      },

      async response => {
        const {assets} = response;
        if (assets) {
          let sourceUri = assets[0]?.uri || '';

          await ImageResizer.createResizedImage(
            sourceUri,
            assets[0].width || 0,
            assets[0].height || 0,
            'JPEG',
            100,
          )
            .then(resizedImageUri => {
              sourceUri = resizedImageUri.uri;
            })
            .catch(err => {
              //
            });

          const imgWidth = assets[0].width || 0;
          const imgHeight = assets[0].height || 0;

          setActualWidth(imgWidth);
          setActualHeight(imgHeight);

          // Calculate Image Size
          getDimensions(imgWidth, imgHeight);

          PixelColor.setImage(sourceUri);
          setImgUri(sourceUri);
          getDominantColors(sourceUri);
        }
      },
    );
  };

  useEffect(() => {
    if (imgUri) {
      getColorAt();
    }
  }, [height, imgUri]);

  const toggleAutoExtract = () => {
    if (!isDominant) {
      if (dominantColors.length > 0) {
        addArrayToPreview(dominantColors);
        setIsDominant(true);
      }
    } else {
      setIsDominant(false);
    }
  };

  //  Add color to preview
  const addToPreview = () => updatePreview(color.value, 'add');

  //
  // Camera Frame Processing
  const isPageActive = useSharedValue(true);
  const [torch, setTorch] = useState<CameraProps['torch']>('off');
  const devices = useCameraDevices('wide-angle-camera');
  const [device, setDevice] = useState<CameraDevice | undefined>(undefined);

  useEffect(() => {
    setDevice((devices.back ? devices.back : devices.front) || undefined);
  }, [devices]);

  const setColorDets = (hex: string) => {
    const name = chroma.valid(hex) ? ntc.name(hex) : 'Unknown';
    color.value = hex;
    colorName.value = name;
  };

  // Frame Processor
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      // Don't process frames if we're holding
      if (!isPageActive.value) return;

      // Get the color palette of the frame
      const result = getColor(frame);

      // If we don't have colors, return
      if (!result?.hexString || !isPageActive.value) return;
      runOnJS(setColorDets)(result?.hexString);
    },
    [isPageActive],
  );

  const cameraAnimatedProps = useAnimatedProps<CameraProps>(
    () => ({
      isActive: isPageActive.value && !imgUri,
    }),
    [isPageActive],
  );

  // Disable the camera when the App/Page is not active
  useEffect(() => {
    const listener = AppState.addEventListener('change', state => {
      isPageActive.value = state === 'active';
    });
    return () => {
      listener.remove();
    };
  }, [isPageActive]);

  // Toggle Flash
  const toggleFlash = () => {
    if (isPageActive.value && !imgUri)
      setTorch(prev => (prev === 'off' ? 'on' : 'off'));
  };
  const disableFlash = () => setTorch('off');

  return (
    <LogicContext.Provider
      value={{
        getColorAt,
        selectImage,
        removeImage,
        toggleFlash,
        setMaxHeight,
        disableFlash,
        addToPreview,
        frameProcessor,
        toggleAutoExtract,
        cameraDevice: device,

        torch,
        colorName,
        isDominant,
        imageWidth: width,
        activeColor: color,
        animatedImageColor,
        cameraAnimatedProps,
        imageHeight: height,
        selectedImg: imgUri,
      }}>
      {children}
    </LogicContext.Provider>
  );
}

export function useLogic() {
  return useContext(LogicContext);
}
