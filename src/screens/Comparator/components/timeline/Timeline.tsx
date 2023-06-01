import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import StepIndicator from './StepIndicator';
import {View, StyleSheet} from 'react-native';
import useColorScheme from '@hooks/useColorScheme';

interface TimelineProps {
  icons?: any[];
  activeStep: number;
  sliderColor?: string;
  sliderHeight?: number;
  numberOfSteps?: number;
  indicatorSize?: number;
}

const Timeline = ({
  icons,
  sliderColor,
  activeStep = 0,
  numberOfSteps = 4,
  sliderHeight = 4.6,
  indicatorSize = 34,
}: TimelineProps) => {
  const ANIMATION_DURATION = 300;
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const sliderDefault = isDark ? '#ddd' : '#333';
  const sliderUnderlay = isDark ? '#333' : '#ccc';

  const progress = useSharedValue(0);

  const handlePress = () => {
    progress.value = withTiming((activeStep * 1) / (numberOfSteps - 1), {
      easing: Easing.linear,
      duration: ANIMATION_DURATION,
    });
  };

  useEffect(() => {
    handlePress();
  }, [activeStep]);

  const lineStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <>
      <View style={styles.timeline}>
        <View
          style={[
            styles.sliderContainer,
            {
              paddingHorizontal: indicatorSize / 2,
            },
          ]}>
          <Animated.View
            style={[
              lineStyle,
              styles.slider,
              {
                zIndex: 2,
                height: sliderHeight,
                backgroundColor: sliderColor || sliderDefault,
              },
            ]}
          />

          <View
            style={[
              styles.sliderUnderlay,
              {
                backgroundColor: sliderUnderlay,
              },
            ]}
          />
        </View>

        <View style={[styles.indicators]}>
          {Array.from({length: numberOfSteps}, (_, i) => i + 1).map(
            (step, index) => {
              return (
                <StepIndicator
                  key={index}
                  step={index}
                  activeStep={activeStep}
                  indicatorSize={indicatorSize}
                  duration={ANIMATION_DURATION}>
                  {icons && icons?.length > 0 ? icons[index] : null}
                </StepIndicator>
              );
            },
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timeline: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: '100%',
    position: 'absolute',
  },
  slider: {
    borderRadius: 4,
    maxWidth: '100%',
  },
  sliderUnderlay: {
    opacity: 0.8,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
  indicators: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Timeline;
