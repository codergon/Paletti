import {
  Camera,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
} from 'react-native-vision-camera';
import Layout from '@constants/Layout';
import {StyleSheet} from 'react-native';
import {Scan} from 'phosphor-react-native';
import {useLogic} from '@context/LogicContext';
import Reanimated from 'react-native-reanimated';
import {useCallback, useRef, useState} from 'react';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  isActive: true,
});

const MAX_FRAME_PROCESSOR_FPS = 1.2;

const CameraScanner = () => {
  const cameraRef = useRef<Camera>(null);
  const [frameProcessorFps, setFrameProcessorFps] = useState(
    MAX_FRAME_PROCESSOR_FPS,
  );
  const {cameraDevice, frameProcessor, cameraAnimatedProps} = useLogic();

  const onCameraError = useCallback((error: CameraRuntimeError) => {
    console.log('error');
  }, []);

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

  return (
    <Reanimated.View
      style={[
        styles.cameraCover,
        {
          width: Layout.window.width,
        },
      ]}>
      {!!cameraDevice && (
        <>
          <ReanimatedCamera
            photo={true}
            torch={'off'}
            ref={cameraRef}
            isActive={true}
            device={cameraDevice}
            style={[styles.camera]}
            onError={onCameraError}
            frameProcessor={frameProcessor}
            frameProcessorFps={frameProcessorFps}
            onFrameProcessorPerformanceSuggestionAvailable={
              onPerformanceSuggested
            }
            animatedProps={cameraAnimatedProps}>
            <Scan size={46} color="#fff" weight="light" />
          </ReanimatedCamera>
        </>
      )}
    </Reanimated.View>
  );
};

export default CameraScanner;

const styles = StyleSheet.create({
  cameraCover: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  camera: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
