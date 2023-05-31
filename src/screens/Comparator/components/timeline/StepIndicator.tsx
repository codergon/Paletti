import React, {cloneElement, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MdText} from '../../../../components/StyledText';
import useColorScheme from '../../../../hooks/useColorScheme';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useAnimatedColor} from '../../../../utils/useAnimatedColor';

interface StepIndicatorProps {
  step: number;
  duration?: number;
  activeStep: number;
  indicatorSize: number;
  children?: React.ReactElement;
}

const StepIndicator = ({
  step,
  children,
  activeStep,
  indicatorSize,
  duration = 500,
}: StepIndicatorProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const borderColor = isDark ? '#666' : '#333';
  const inactiveTextColor = isDark ? '#fff' : '#333';
  const activeTextColor = isDark ? '#000' : '#fff';

  const activeBackgroundColor = isDark ? '#ddd' : '#333';
  const inactiveBackgroundColor = isDark ? '#3f3f3f' : '#f1f1f1';

  const [isActive, setIsActive] = useState(false);

  const animationProgress = useSharedValue(0);

  const handleActive = () => setIsActive(activeStep >= step);

  useEffect(() => {
    animationProgress.value = withDelay(
      duration * 0.7,
      withTiming(activeStep >= step ? 1 : 0, {duration: duration}, () => {
        runOnJS(handleActive)();
      }),
    );
  }, [activeStep]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animationProgress.value,
        [0, 1],
        [inactiveBackgroundColor, activeBackgroundColor],
      ),
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animationProgress.value,
        [0, 1],
        [inactiveTextColor, activeTextColor],
      ),
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        styles.indicator,
        {
          borderColor,
          width: indicatorSize,
          height: indicatorSize,
        },
      ]}>
      {children ? (
        <>
          {cloneElement(children, {
            color: !isActive ? inactiveTextColor : activeTextColor,
          })}
        </>
      ) : (
        <Animated.Text style={[animatedTextStyles]}>{step + 1}</Animated.Text>
      )}
    </Animated.View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
