import Animated, {
  runOnJS,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetBackdropProps, useBottomSheet} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomSignInBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const {close} = useBottomSheet();
  const [isVisible, setIsVisible] = useState(false);

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.4],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#111',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  // Wrapper for runOnJs
  const wrapper = (status: boolean) => {
    setIsVisible(status);
  };

  useAnimatedReaction(
    () => {
      return animatedIndex.value;
    },
    (result, previous) => {
      if (result !== previous) {
        runOnJS(wrapper)(result !== -1);
      }
    },
    [],
  );

  return isVisible ? (
    <Animated.View style={[containerStyle]}>
      <TouchableOpacity
        onPressIn={() => close()}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Animated.View>
  ) : (
    <></>
  );
};

export default CustomSignInBackdrop;
