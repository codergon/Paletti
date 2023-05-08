import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Reanimated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import {
  Camera,
  CameraDevice,
  CameraProps,
  useCameraDevices,
  useFrameProcessor,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
} from 'react-native-vision-camera';
import {getColor} from '../../utils/getColor';
import {hapticFeedback} from '../../utils/hapticFeedback';

import styles from './home.styles';
import BottomBar from './BottomBar';
import {AppState, View} from 'react-native';
import {AppNavigationProp} from '../../types';
import {ViewProps} from '../../components/Themed';
import ColorIndicator from './components/ColorIndicator';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {AnimatedStatusBar} from '../../components/common/AnimatedStatusBar';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  isActive: true,
});

const DEFAULT_COLOR = '#000000';
const MAX_FRAME_PROCESSOR_FPS = 0.8;

type MainAppProps = {
  navigation: AppNavigationProp;
  openProfile: () => void;
};

const MainApp = ({
  navigation,
  openProfile,
  children,
}: MainAppProps & ViewProps) => {
  // States and variables
  const isHolding = useSharedValue(false);
  const isPageActive = useSharedValue(true);
  const [frameProcessorFps, setFrameProcessorFps] = useState(0.8);
  const devices = useCameraDevices('wide-angle-camera');

  const [device, setDevice] = useState<CameraDevice | undefined>(undefined);

  useEffect(() => {
    setDevice((devices.back ? devices.back : devices.front) || undefined);
  }, [devices]);

  const toggleCamera = () => {
    if (devices.back === device && devices.front) {
      setDevice(devices.front);
      return true;
    } else if (devices.front === device && devices.back) {
      setDevice(devices.back);
      return true;
    } else {
      console.log("Can't flip camera!");
      return false;
    }
  };

  const cameraRef = useRef<Camera>(null);
  const saveCameraFrame = async () => {
    try {
      const photo = await cameraRef?.current?.takePhoto({
        flash: 'auto',
      });

      if (photo?.path) {
        await CameraRoll.save(photo.path, {
          type: 'photo',
          album: 'Paletti',
        });
        return true;
      }

      return false;
    } catch (e: any) {
      return e?.message === 'Access to photo library was denied' ? null : false;
    }
  };

  // Color
  const color = useSharedValue(DEFAULT_COLOR);

  // Derived Values
  const colorAnimationDuration = useMemo(
    () => (1 / frameProcessorFps) * 1000,
    [frameProcessorFps],
  );

  // Gesture Reactions
  const onTapBegin = useWorkletCallback(() => {
    isHolding.value = true;
    runOnJS(hapticFeedback)('selection');
  }, [isHolding]);
  const onTapEnd = useWorkletCallback(() => {
    isHolding.value = false;
  }, [isHolding]);

  // Camera Functions
  const onCameraError = useCallback((error: CameraRuntimeError) => {
    navigation.navigate('splash');
  }, []);

  const cameraAnimatedProps = useAnimatedProps<CameraProps>(
    () => ({
      isActive: !isHolding.value && isPageActive.value,
    }),
    [isHolding, isPageActive],
  );

  // Frame Processor
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      // Don't process frames if we're holding
      if (isHolding.value) return;

      // Get the color palette of the frame
      const result = getColor(frame);
      // If we don't have colors, return
      if (!result || !isPageActive.value) return;
      color.value = result?.hexString;
    },
    [isHolding],
  );

  const onPerformanceSuggested = useCallback(
    ({suggestedFrameProcessorFps}: FrameProcessorPerformanceSuggestion) => {
      const newFps = Math.min(
        suggestedFrameProcessorFps,
        MAX_FRAME_PROCESSOR_FPS,
      );
      setFrameProcessorFps(newFps);
    },
    [],
  );

  // Disable the camera when the App/Page is not active
  useEffect(() => {
    const listener = AppState.addEventListener('change', state => {
      isPageActive.value = state === 'active';
    });
    return () => {
      listener.remove();
    };
  }, [isPageActive, isHolding]);

  return (
    <>
      <AnimatedStatusBar
        barStyle="light-content"
        animated={true}
        isHidden={isHolding}
      />

      <Reanimated.View style={styles.container}>
        <TapGestureHandler
          onBegan={onTapBegin}
          onEnded={onTapEnd}
          onFailed={onTapEnd}
          enabled={true}
          minPointers={1}
          maxDurationMs={999999}>
          <View style={[styles.cameraCover]}>
            {!!device && (
              <>
                <ReanimatedCamera
                  photo={true}
                  ref={cameraRef}
                  device={device}
                  isActive={true}
                  frameProcessor={frameProcessor}
                  style={[styles.camera]}
                  onError={onCameraError}
                  frameProcessorFps={frameProcessorFps}
                  onFrameProcessorPerformanceSuggestionAvailable={
                    onPerformanceSuggested
                  }
                  animatedProps={cameraAnimatedProps}>
                  <ColorIndicator
                    color={color}
                    animationDuration={colorAnimationDuration}
                  />
                </ReanimatedCamera>
              </>
            )}
          </View>
        </TapGestureHandler>

        <BottomBar
          saveCameraFrame={saveCameraFrame}
          toggleCamera={toggleCamera}
          openProfile={openProfile}
          color={color}
        />

        {children}
      </Reanimated.View>
    </>
  );
};

export default MainApp;
