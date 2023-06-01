import ColorPicker, {
  Panel1,
  HueSlider,
  OpacitySlider,
  returnedResults,
} from 'reanimated-color-picker';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ntc from '@lib/ntc';
import {useEffect} from 'react';
import {View} from '@components/Themed';
import {padding} from '@helpers/styles';
import {StyleSheet} from 'react-native';
import useColorScheme from 'hooks/useColorScheme';
import {useAnimatedColor} from '@utils/useAnimatedColor';
import AnimateableText from 'react-native-animateable-text';

type ColorsPickerProps = {
  color: Animated.SharedValue<string>;
};

const ColorsPicker = ({color}: ColorsPickerProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const darkColor = isDark ? '#fff' : '#000';
  const hexColor = isDark ? '#aeaeae' : '#888';
  const colorName = useSharedValue('Chenin');
  const animatedColor = useAnimatedColor(color, 200);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedColor.value,
    };
  }, [animatedColor]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: colorName.value,
    };
  }, [colorName]);
  const animatedPropsHex = useAnimatedProps(() => {
    return {
      text: color.value,
    };
  }, [color]);

  const onSelectColor = ({hex}: returnedResults) => {
    color.value = hex;
    const name = ntc.name(hex);
    colorName.value = name;
  };

  useEffect(() => {
    onSelectColor({hex: color.value} as returnedResults);
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={styles.previewContainer}>
          <Animated.View
            style={[
              styles.preview,
              {
                borderColor: isDark ? '#888' : '#aaa',
              },
              animatedStyles,
            ]}
          />
          <View style={styles.colorDetails}>
            <AnimateableText
              numberOfLines={1}
              animatedProps={animatedProps}
              style={[
                styles.colorName,
                {
                  color: darkColor,
                  letterSpacing: 0.45,
                  textTransform: 'capitalize',
                  fontFamily: 'NeueMontreal-Medium',
                },
              ]}
            />

            <AnimateableText
              numberOfLines={1}
              animatedProps={animatedPropsHex}
              style={[
                styles.colorhex,
                {
                  color: hexColor,
                  letterSpacing: 0.3,
                  fontFamily: 'NeueMontreal-Medium',
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
        }}>
        <ColorPicker
          value="#fff8da"
          style={{width: '100%'}}
          sliderThickness={25}
          onChange={onSelectColor}>
          <Panel1
            style={{
              height: 150,
              borderRadius: 16,
            }}
          />
          <HueSlider
            thumbSize={32}
            thumbShape="pill"
            vertical={false}
            style={{
              marginTop: 14,
              borderRadius: 8,
              marginBottom: 16,
            }}
            thumbInnerStyle={{
              width: 8,
              backgroundColor: '#fff',
            }}
          />
          <OpacitySlider
            thumbSize={32}
            thumbShape="pill"
            style={{
              borderRadius: 8,
            }}
            thumbInnerStyle={{
              width: 8,
              backgroundColor: '#fff',
            }}
          />
        </ColorPicker>
      </View>
    </View>
  );
};

export default ColorsPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 4,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  preview: {
    width: 46,
    height: 46,
    marginRight: 14,
    borderWidth: 0.5,
    borderRadius: 140,
    alignItems: 'center',
    borderColor: '#aeaeae',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  colorDetails: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  colorName: {
    fontSize: 18,
    marginBottom: 1,
  },
  colorhex: {
    fontSize: 15,
    marginTop: 2,
    textTransform: 'uppercase',
  },

  btnsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  saveBtn: {
    borderRadius: 8,
    ...padding(10, 15),
  },
  btnText: {
    fontSize: 14,
  },
});
