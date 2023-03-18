import {CaretDown} from 'phosphor-react-native';
import {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AnimateableText from 'react-native-animateable-text';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {View} from '../../../components/Themed';
import Layout from '../../../constants/Layout';
import ntc from '../../../lib/ntc';
import {useAnimatedColor} from '../../../utils/useAnimatedColor';

const mainColor = '#eee';

interface Props {
  animationDuration: number;
  color: Animated.SharedValue<string>;
}

const ColorIndicator = ({color, animationDuration}: Props) => {
  //  Animated Ring
  const size = useSharedValue(200);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: size.value,
    };
  });

  useEffect(() => {
    size.value = withRepeat(
      withTiming(Layout.appWidth * 0.8, {
        duration: 1000,
      }),
      -1,
      true,
    );
  }, []);

  // Animated Color
  const animatedColor = useAnimatedColor(color, animationDuration);
  const animatedBgColor = useAnimatedStyle(
    () => ({
      backgroundColor: animatedColor.value,
    }),
    [animatedColor],
  );

  //  Animated Text
  const animatedProps = useAnimatedProps(() => {
    return {
      text: color.value,
    };
  }, [color]);

  return (
    <View style={styles.indicatorContainer}>
      <Animated.View style={[styles.animatedRing, animatedStyles]} />

      <View style={[styles.detailsContent]}>
        <View style={[styles.detailsContainer]}>
          <View style={[styles.details]}>
            <Animated.View style={[styles.color, animatedBgColor]} />
            <AnimateableText
              numberOfLines={1}
              animatedProps={animatedProps}
              style={[styles.colorText]}
            />
          </View>

          <CaretDown
            size={26}
            color="#fff"
            weight="fill"
            style={{
              marginTop: -10,
            }}
          />
        </View>

        <View style={[styles.centerDot]} />
      </View>
    </View>
  );
};

export default ColorIndicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  animatedRing: {
    aspectRatio: 1,
    borderWidth: 1.5,
    borderRadius: 300,
    borderColor: mainColor,
    backgroundColor: 'transparent',
  },

  detailsContent: {
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: 'transparent',

    paddingBottom: 25,
  },
  detailsContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  details: {
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  color: {
    width: 19,
    height: 19,
    borderRadius: 50,
  },
  colorText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    fontFamily: 'NeueMontreal-Medium',
  },
  centerDot: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
