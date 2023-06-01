import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {edges} from '@helpers/styles';
import Layout from '@constants/Layout';
import {StyleSheet} from 'react-native';
import {ReactNode, useEffect} from 'react';
import {snapPoint} from 'react-native-redash';
import useColorScheme from '@hooks/useColorScheme';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type BottomSheetProps = {
  children?: ReactNode;
  SCREEN_HEIGHT: number;
  isColorModal?: boolean;
  MAX_TRANSLATE_Y: number;
  scrollTo: (destination: number) => void;
  translateY: Animated.SharedValue<number>;
};

const BottomSheet = ({
  scrollTo,
  children,
  translateY,
  isColorModal,
  SCREEN_HEIGHT,
  MAX_TRANSLATE_Y,
}: BottomSheetProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? (isColorModal ? '#3c3c3c' : '#242424') : '#f5f5f5';

  useEffect(() => {
    scrollTo(MAX_TRANSLATE_Y);
  }, []);

  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(event => {
      const {velocityY} = event;
      const snap = snapPoint(translateY.value, velocityY, [MAX_TRANSLATE_Y, 0]);
      scrollTo(velocityY > 660 ? 0 : snap);
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          {
            ...edges(isColorModal ? 20 : 14, 0),
            height: SCREEN_HEIGHT,
            backgroundColor: bgColor,
            top: Layout.window.height,
          },
          rBottomSheetStyle,
        ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: Layout.window.width,
    position: 'absolute',
    overflow: 'hidden',
  },
});

export default BottomSheet;
