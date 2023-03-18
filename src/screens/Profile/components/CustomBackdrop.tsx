import {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomSheetBackdropProps, useBottomSheet} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Text} from '../../../components/Themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FloppyDisk, Share, X} from 'phosphor-react-native';

import RNShare from 'react-native-share';
import {useAppSelector} from '../../../hooks/storeHooks';

const CustomBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
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

  const {imgUri} = useAppSelector(state => state.profile);

  const sharePalette = async () => {
    if (!imgUri) return;

    try {
      await RNShare.open({
        title: 'Paletti Collection',
        // url: 'https://williamsatakere.com',
        url: 'file:/' + imgUri,
        message: 'My Paletti Color Collection ✨ - Check it out!',
      });
      // console.log('here');
    } catch (err) {
      console.log(err);
    }
  };

  return isVisible ? (
    <Animated.View
      style={[
        containerStyle,
        {
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: insets.top + 10,
          justifyContent: 'space-between',
        },
      ]}>
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
          onPress={sharePalette}>
          <Share size={26} color={'#fff'} weight="bold" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn]} onPress={sharePalette}>
          <FloppyDisk size={26} color={'#fff'} weight="bold" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  ) : (
    <></>
  );
};

export default CustomBackdrop;

const styles = StyleSheet.create({
  actionBtnCover: {
    height: 50,
    flexGrow: 0,
    flexDirection: 'row',
  },
  actionBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#222',
  },
});
