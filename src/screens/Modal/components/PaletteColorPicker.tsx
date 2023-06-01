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
import {StyleSheet} from 'react-native';
import {padding} from '@helpers/styles';
import {Plus} from 'phosphor-react-native';
import {useStore} from '@context/AppContext';
import useColorScheme from '@hooks/useColorScheme';
import {useAnimatedColor} from '@utils/useAnimatedColor';
import {TouchableOpacity, View} from '@components/Themed';
import AnimateableText from 'react-native-animateable-text';

type PaletteColorPickerProps = {
  paletteId: string;
  closeModal: () => void;
};

const PaletteColorPicker = ({
  paletteId,
  closeModal,
}: PaletteColorPickerProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const color = useSharedValue('#5912ff');
  const darkColor = isDark ? '#fff' : '#000';
  const colorName = useSharedValue('Electric Violet');
  const animatedColor = useAnimatedColor(color, 200);

  const {addPaletteColor} = useStore();

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

  const addColorToPalette = async () => {
    await addPaletteColor(color.value, paletteId);
    closeModal();
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={styles.previewContainer}>
          <Animated.View
            style={[
              styles.preview,
              {
                // borderWidth: 0.2,
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
                  color: '#aeaeae',
                  letterSpacing: 0.3,
                  fontFamily: 'NeueMontreal-Medium',
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.btnsContainer}>
          <TouchableOpacity
            onPress={addColorToPalette}
            style={[
              styles.saveBtn,
              {
                marginBottom: 2,
                backgroundColor: isDark ? '#777' : '#ccc',
              },
            ]}>
            <Plus size={21} weight="bold" color={isDark ? '#fff' : '#444'} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
        }}>
        <ColorPicker
          value="#5912ff"
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

export default PaletteColorPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 4,
    paddingVertical: 15,
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
    borderWidth: 0.3,
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
