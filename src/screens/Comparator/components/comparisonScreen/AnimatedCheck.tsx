import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {View} from '../../../../components/Themed';
import {interpolatePath, parse} from 'react-native-redash';
import useColorScheme from '../../../../hooks/useColorScheme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const d1 = parse('M5 17L5.5 17.5L6 18');
const d2 = parse('m5 17 6.5 6.5.5.5');
const d3 = parse('m5 17 7 7L28 8');

const AnimatedCheck = () => {
  const progess = useSharedValue(0);
  const isDark = useColorScheme() === 'dark';
  const svgColor = isDark ? '#fff' : '#000';
  const backgroundColor = isDark ? '#000' : '#fff';

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: interpolate(progess.value, [0, 0.1, 1], [0, 1, 1]),
      d: interpolatePath(progess.value, [0, 0.5, 1], [d1, d2, d3]),
    };
  });

  useEffect(() => {
    progess.value = withTiming(1, {
      duration: 300,
    });
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}>
      <Svg style={styles.svg} fill="none" viewBox="0 0 32 32">
        <AnimatedPath
          strokeWidth={5}
          stroke={svgColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
};

export default AnimatedCheck;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    width: '60%',
    height: '60%',
    backgroundColor: 'transparent',
  },
});
