import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Lightning,
  Eyedropper,
  ImageSquare,
  CameraRotate,
  LightningSlash,
  HandPointing,
} from 'phosphor-react-native';
import {View} from '@components/Themed';
import {padding} from '@helpers/styles';
import {MdText} from '@components/StyledText';
import {useLogic} from '@context/LogicContext';
import useColorScheme from '@hooks/useColorScheme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AnimateableText from 'react-native-animateable-text';

const ColorDetails = () => {
  const {
    torch,
    colorName,
    isDominant,
    activeColor,
    selectedImg,
    selectImage,
    removeImage,
    toggleFlash,
    toggleAutoExtract,
  } = useLogic();

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const btnColor = isDark ? '#fff' : '#000';
  const darkColor = isDark ? '#fff' : '#000';

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: activeColor.value,
    };
  }, [activeColor]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: colorName.value,
    };
  }, [colorName]);
  const animatedPropsHex = useAnimatedProps(() => {
    return {
      text: activeColor.value,
    };
  }, [activeColor]);

  return (
    <View style={[styles.container]}>
      <View style={styles.previewContainer}>
        {isDominant ? (
          <>
            <View
              style={[
                styles.preview,
                {
                  width: 'auto',
                  backgroundColor: 'transparent',
                },
              ]}>
              <MdText
                style={[
                  {
                    fontSize: 19,
                    letterSpacing: 0.3,
                  },
                ]}>
                Dominant Colors
              </MdText>
            </View>
          </>
        ) : (
          <>
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
                    fontFamily: 'NeueMontreal-Bold',
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
          </>
        )}
      </View>

      <View style={[styles.actionbtns]}>
        {!selectedImg ? (
          <TouchableOpacity onPress={toggleFlash} style={[styles.actionbtn]}>
            {torch === 'on' ? (
              <LightningSlash weight="fill" size={24} color={btnColor} />
            ) : (
              <Lightning weight="fill" size={24} color={btnColor} />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleAutoExtract}
            style={[
              styles.actionBtnAuto,
              {
                borderColor: isDark ? '#444' : '#ddd',
                backgroundColor: isDark ? '#333' : '#eee',
              },
            ]}>
            {isDominant ? (
              <HandPointing weight="bold" size={14} color={darkColor} />
            ) : (
              <Eyedropper weight="bold" size={14} color={darkColor} />
            )}
            <MdText
              style={[
                styles.actionBtnAuto__text,
                {
                  color: darkColor,
                },
              ]}>
              {isDominant ? 'Select' : 'Auto'}
            </MdText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            if (selectedImg) {
              removeImage();
            } else {
              selectImage();
            }
          }}
          style={[styles.actionbtn]}>
          {!selectedImg ? (
            <ImageSquare weight="fill" size={25} color={btnColor} />
          ) : (
            <CameraRotate weight="regular" size={25} color={btnColor} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ColorDetails;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewContainer: {
    flexDirection: 'row',
  },
  preview: {
    width: 52,
    height: 52,
    marginRight: 14,
    borderRadius: 140,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#d8c092',
  },
  colorDetails: {
    justifyContent: 'center',
  },
  colorName: {
    fontSize: 17,
    marginBottom: 1,
  },
  colorhex: {
    fontSize: 14,
    marginTop: 2,
    textTransform: 'uppercase',
  },

  actionbtns: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  actionbtn: {
    padding: 8,
    marginLeft: 14,
  },
  actionBtnAuto: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    ...padding(6, 12, 6, 10),
  },
  actionBtnAuto__text: {
    fontSize: 13,
    marginLeft: 5,
  },
});
