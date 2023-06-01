import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Layout from '@constants/Layout';
import {View} from '@components/Themed';
import {Path, Svg} from 'react-native-svg';
import {useLogic} from '@context/LogicContext';
import {ColorValue, Image, StyleSheet} from 'react-native';

const size = 40;
const MAX_WIDTH = Layout.window.width - 40;
const AnimatedPath = Animated.createAnimatedComponent(Path);

const ImageColors = () => {
  const {
    imageWidth,
    isDominant,
    getColorAt,
    imageHeight,
    selectedImg,
    activeColor,
  } = useLogic();

  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
    };
  }, [activeColor]);

  const animatedProps = useAnimatedProps(() => {
    const hexValue = activeColor.value.replace('#', '');
    const r = parseInt(hexValue.substr(0, 2), 16);
    const g = parseInt(hexValue.substr(2, 2), 16);
    const b = parseInt(hexValue.substr(4, 2), 16);
    const rgba = `rgba(${r},${g},${b},1)`;

    return {
      fill: rgba as ColorValue,
    };
  }, [activeColor]);

  const gestureHandler = Gesture.Pan()
    .onUpdate(e => {
      if (selectedImg) {
        offset.value = {
          x: Math.max(
            -(imageWidth / 2),
            Math.min(e.translationX + start.value.x, imageWidth / 2),
          ),
          y: Math.max(
            -(imageHeight / 2),
            Math.min(e.translationY + start.value.y, imageHeight / 2),
          ),
        };
        runOnJS(getColorAt)(offset.value.x, offset.value.y);
      }
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  return (
    <>
      <GestureHandlerRootView>
        <GestureDetector gesture={gestureHandler}>
          <Animated.View
            style={[
              styles.imageContainer,
              {
                maxWidth: MAX_WIDTH,
              },
            ]}>
            {selectedImg && (
              <>
                <Image
                  source={{uri: selectedImg}}
                  style={{
                    borderRadius: 6,
                    width: imageWidth,
                    height: imageHeight,
                  }}
                />

                {!isDominant && (
                  <Animated.View style={[styles.cursor, animatedStyles]}>
                    <Svg
                      fill="none"
                      style={{
                        width: size,
                        position: 'absolute',
                        height: size * (102 / 87),
                        transform: [{translateY: (-size * (102 / 87)) / 2}],
                      }}
                      viewBox="0 0 87 102">
                      <AnimatedPath
                        stroke={'#fff'}
                        strokeWidth={4}
                        animatedProps={animatedProps}
                        d="M15.175 15.171a40.547 40.547 0 0 0 0 57.28l25.637 25.637a4.246 4.246 0 0 0 5.997 0l25.64-25.64a40.5 40.5 0 0 0-57.274-57.277Z"
                      />
                    </Svg>
                    <View style={[styles.cursorInner]} />
                  </Animated.View>
                )}
              </>
            )}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

export default ImageColors;

const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: 0,
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  cursor: {
    width: 10,
    height: 10,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cursorInner: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
