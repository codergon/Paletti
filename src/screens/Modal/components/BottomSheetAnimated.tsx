import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {edges} from '../../../helpers/styles';
import Layout from '../../../constants/Layout';
import {clamp, snapPoint} from 'react-native-redash';
import {useNavigation} from '@react-navigation/native';
import {ReactNode, useCallback, useEffect} from 'react';
import useColorScheme from '../../../hooks/useColorScheme';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type BottomSheetProps = {
  children?: ReactNode;
  translateY: Animated.SharedValue<number>;
};

const BottomSheet = ({children, translateY}: BottomSheetProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#333' : '#fff';
  const SCREEN_HEIGHT = Layout.window.height - insets.top - 14;
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

  const active = useSharedValue(false);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withTiming(
      destination,
      {
        duration: 300,
        //   easing: Easing.in(Easing.ease),
      },
      () => {
        console.log('done ', active.value);
        if (active.value === false) {
          runOnJS(onClose)();
        }
      },
    );
  }, []);

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT);
  }, []);

  const onClose = () => {
    navigation.goBack();
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (
      _,
      ctx: {
        startX: number;
      },
    ) => {
      ctx.startX = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = clamp(
        ctx.startX + event.translationY,
        MAX_TRANSLATE_Y,
        0,
      );
    },
    onEnd: event => {
      const {velocityY} = event;
      const snap = snapPoint(translateY.value, velocityY, [MAX_TRANSLATE_Y, 0]);
      scrollTo(velocityY > 660 ? 0 : snap);

      //   if (snap === 0) {
      //     runOnJS(onClose)();
      //   }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          {
            ...edges(10, 0),
            height: SCREEN_HEIGHT,
            backgroundColor: bgColor,
            top: Layout.window.height,
          },
          rBottomSheetStyle,
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
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
