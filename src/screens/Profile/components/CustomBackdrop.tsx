import Animated, {
  runOnJS,
  FadeOut,
  Extrapolate,
  interpolate,
  SlideInDown,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useMemo, useState} from 'react';
import {useStore} from '../../../context/AppContext';
import {MdText} from '../../../components/StyledText';
import {useSheet} from '../../../context/SheetContext';
import {FloppyDisk, Share, X} from 'phosphor-react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetBackdropProps, useBottomSheet} from '@gorhom/bottom-sheet';

const CustomBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
  const {collection} = useStore();
  const {savePalette, sharePalette, statusMsg} = useSheet();

  const {close} = useBottomSheet();
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
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

  const saveScreenShot = async () => {
    await savePalette();
  };

  return isVisible ? (
    <Animated.View
      style={[
        containerStyle,
        {
          paddingHorizontal: 20,
          flexDirection: 'column',
          paddingTop: insets.top + 10,
        },
      ]}>
      <View style={styles.block}>
        <TouchableOpacity style={[styles.actionBtn]} onPress={() => close()}>
          <X size={26} color={'#fff'} weight="bold" />
        </TouchableOpacity>

        <View style={[styles.actionBtnCover]}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                marginRight: 18,
              },
            ]}
            onPress={() => {
              sharePalette();
            }}>
            <Share
              size={26}
              weight="bold"
              color={Boolean(collection?.length > 0) ? '#fff' : '#888'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn]} onPress={saveScreenShot}>
            <FloppyDisk
              size={26}
              weight="bold"
              color={Boolean(collection?.length > 0) ? '#fff' : '#888'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusMsgCover}>
        {(statusMsg?.message?.length || 0) > 0 ? (
          <Animated.View
            exiting={FadeOut}
            entering={SlideInDown}
            style={styles.blockCenter}>
            <MdText
              style={[
                statusMsg?.type === 'error'
                  ? styles.warning_text
                  : statusMsg?.type === 'success'
                  ? styles.success_text
                  : styles.normal_text,
              ]}>
              {statusMsg?.message}
            </MdText>
          </Animated.View>
        ) : (
          <></>
        )}
      </View>
    </Animated.View>
  ) : (
    <></>
  );
};

export default CustomBackdrop;

const styles = StyleSheet.create({
  block: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warning_text: {
    color: '#fca75d',
  },
  error_text: {
    color: '#ef857a',
  },
  success_text: {
    color: '#3cf2af',
  },
  normal_text: {
    color: '#fff',
  },

  statusMsgCover: {
    height: 35,
    marginTop: 5,
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  blockCenter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionBtnCover: {
    height: 45,
    width: 100,
    flexGrow: 0,
    flexDirection: 'row',
  },
  actionBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
