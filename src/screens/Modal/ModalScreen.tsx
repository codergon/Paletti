import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedReaction,
  runOnJS,
  useAnimatedProps,
} from 'react-native-reanimated';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Layout from '../../constants/Layout';
import {ModalScreenProps} from '../../types';
import BottomSheet from './components/BottomSheet';
import {Container} from '../../components/Customized';
import {useNavigation} from '@react-navigation/native';
import ExportPreview from './components/ExportPreview';
import useColorScheme from '../../hooks/useColorScheme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PaletteType} from '../../types/palette';
import PaletteColorPicker from './components/PaletteColorPicker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ModalScreen({route}: ModalScreenProps) {
  const {data} = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bacdropOpacity = isDark ? 0.3 : 0.22;
  const isColorModal = data?.showColorPicker === true;

  const active = useSharedValue(false);
  const translateY = useSharedValue(0);
  const [shouldClose, setShouldClose] = useState(false);

  const SCREEN_HEIGHT = Layout.window.height - insets.top - 14;
  const MAX_TRANSLATE_Y = isColorModal ? -370 : -SCREEN_HEIGHT;

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withTiming(destination, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);

  const closeModal = useCallback(() => {
    scrollTo(0);
  }, []);

  useEffect(() => {
    if (shouldClose) {
      navigation.goBack();
    }
  }, [shouldClose]);

  useAnimatedReaction(
    () => {
      return !active.value && translateY.value === 0;
    },
    status => {
      if (status) {
        runOnJS(setShouldClose)(true);
      }
    },
  );

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, MAX_TRANSLATE_Y],
      [0, bacdropOpacity],
      Extrapolate.CLAMP,
    ),
  }));

  return !shouldClose ? (
    <GestureHandlerRootView>
      <Container style={[styles.container]}>
        <AnimatedTouchable
          activeOpacity={bacdropOpacity}
          onPress={() => {
            closeModal();
          }}
          style={[
            styles.backdrop,
            {
              opacity: bacdropOpacity,
            },
            backdropAnimatedStyle,
          ]}
        />

        <BottomSheet
          scrollTo={scrollTo}
          translateY={translateY}
          isColorModal={isColorModal}
          SCREEN_HEIGHT={SCREEN_HEIGHT}
          MAX_TRANSLATE_Y={MAX_TRANSLATE_Y}>
          {isColorModal ? (
            <PaletteColorPicker
              closeModal={closeModal}
              paletteId={data?.paletteId}
            />
          ) : (
            <ExportPreview palette={data} closeModal={closeModal} />
          )}
        </BottomSheet>
      </Container>
    </GestureHandlerRootView>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  backdrop: {
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#111',
    width: Layout.window.width,
    height: Layout.window.height,
  },
});
