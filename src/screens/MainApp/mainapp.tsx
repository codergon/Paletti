import {useCallback, useEffect, useMemo, useState} from 'react';

import Reanimated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import {
  Camera,
  CameraProps,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {getColor} from '../../utils/getColor';
import {hapticFeedback} from '../../utils/hapticFeedback';

import {AppState, StatusBar, View} from 'react-native';
import styles from './mainapp.styles';

import {AppNavigationProp, RootStackScreenProps} from '../../types/types';
import BottomBar from './BottomBar';

import ActionBar from './ActionBar';
import ColorIndicator from './components/ColorIndicator';
import {AnimatedStatusBar} from '../../components/common/AnimatedStatusBar';
import {ViewProps} from '../../components/Themed';

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
  const [flashMode, setFlashMode] = useState<'on' | 'off'>('off');
  const [frameProcessorFps, setFrameProcessorFps] = useState(0.8);
  const devices = useCameraDevices();
  const device = devices.back;

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
    navigation.navigate('Splash');
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
      return;
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

  //

  const toggleCameraType = () => {
    console.log('koko');
  };

  return (
    <>
      {/* <AppStatusBar barStyle={'dark-content'} backgroundColor={'transparent'} /> */}

      {/* <TapGestureHandler
        onBegan={onTapBegin}
        onEnded={onTapEnd}
        onFailed={onTapEnd}
        enabled={true}
        minPointers={1}
        maxDurationMs={999999}> */}

      <>
        <AnimatedStatusBar
          barStyle="light-content"
          animated={true}
          isHidden={isHolding}
        />
        <Reanimated.View style={styles.container}>
          <View style={[styles.cameraCover]}>
            <>
              {/* Camera */}
              {!!device && false && (
                <ReanimatedCamera
                  // preset={'high'}
                  // @ts-ignore
                  device={device}
                  isActive={true} // <-- overriden by animatedProps
                  frameProcessor={frameProcessor}
                  style={[styles.camera]}
                  onError={onCameraError}
                  frameProcessorFps={frameProcessorFps}
                  onFrameProcessorPerformanceSuggestionAvailable={
                    onPerformanceSuggested
                  }
                  animatedProps={cameraAnimatedProps}>
                  {/* <BlurredView intensity={18} style={[styles.blurredTop]} /> */}

                  <ActionBar
                    flashMode={flashMode}
                    setFlashMode={setFlashMode}
                    toggleCameraType={toggleCameraType}
                  />

                  <ColorIndicator
                    color={color}
                    animationDuration={colorAnimationDuration}
                  />
                </ReanimatedCamera>
              )}

              {/* <Camera style={styles.camera} type={type} flashMode={flashMode}>
              <BlurredView intensity={18} style={[styles.blurredTop]} />

              <ActionBar
                flashMode={flashMode}
                setFlashMode={setFlashMode}
                toggleCameraType={toggleCameraType}
              />
              <ColorIndicator />
            </Camera> */}
            </>
          </View>

          <BottomBar openProfile={openProfile} />

          {children}
        </Reanimated.View>
      </>
      {/* </TapGestureHandler> */}
    </>
  );
};

export default MainApp;
