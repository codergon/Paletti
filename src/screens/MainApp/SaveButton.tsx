import {StyleSheet, useColorScheme, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
  withDelay,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import {Check} from 'phosphor-react-native';

import Svg, {Defs, Mask, Path} from 'react-native-svg';
import {interpolatePath, parse} from 'react-native-redash';

type Props = {
  color: string;
  saving?: boolean;
  isSaving: Animated.SharedValue<boolean>;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const d1 = parse('M5 17L5.5 17.5L6 18');
const d2 = parse('m5 17 6.5 6.5.5.5');
const d3 = parse('m5 17 7 7L28 8');

const SaveButton = ({isSaving, saving}: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const realCol = isDark ? '#000000' : '#ffffff';

  const progess = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: interpolate(progess.value, [0, 0.1, 1], [0, 1, 1]),
      d: interpolatePath(progess.value, [0, 0.5, 1], [d1, d2, d3]),
    };
  });

  useEffect(() => {
    progess.value = withDelay(
      saving ? 150 : 0,
      withTiming(saving ? 1 : 0, {
        duration: 300,
      }),
    );
  }, [saving]);

  return saving ? (
    <Animated.View
      style={[styles.container]}
      exiting={ZoomOut}
      entering={ZoomIn.duration(150)}
      // entering={ZoomIn.withCallback(animateSvg)}
    >
      <Svg style={styles.svg} fill="none" viewBox="0 0 32 32">
        <AnimatedPath
          strokeWidth={5}
          stroke={realCol}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </Svg>
    </Animated.View>
  ) : (
    <></>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 2,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  svg: {
    width: '53%',
    height: '53%',
  },
});
