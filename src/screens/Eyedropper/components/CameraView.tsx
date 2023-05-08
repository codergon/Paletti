import {
  Camera,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
} from 'react-native-vision-camera';
import {StyleSheet} from 'react-native';
import {Scan} from 'phosphor-react-native';
import Layout from '../../../constants/Layout';
import Reanimated from 'react-native-reanimated';
import {useCallback, useRef, useState} from 'react';
import {useLogic} from '../../../context/LogicContext';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  isActive: true,
});

const MAX_FRAME_PROCESSOR_FPS = 1.2;

const CameraView = () => {
  const cameraRef = useRef<Camera>(null);
  const [frameProcessorFps, setFrameProcessorFps] = useState(
    MAX_FRAME_PROCESSOR_FPS,
  );
  const {torch, cameraDevice, frameProcessor, cameraAnimatedProps} = useLogic();

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
            ref={cameraRef}
            isActive={true}
            torch={torch}
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

export default CameraView;

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
