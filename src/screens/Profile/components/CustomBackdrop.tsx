import Animated, {
  runOnJS,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {useMemo, useState} from 'react';
import RNShare, {ShareOptions} from 'react-native-share';
import {FloppyDisk, Share, X} from 'phosphor-react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {setErrorMsg} from '../../../store/profile/profileSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHooks';
import {BottomSheetBackdropProps, useBottomSheet} from '@gorhom/bottom-sheet';

const CustomBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
  const dispatch = useAppDispatch();
  const {close} = useBottomSheet();
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const {collection} = useAppSelector(state => state.profile);

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
    if (!collection || Object.keys({...collection})?.length <= 0) {
      dispatch(setErrorMsg('You have no colors in your collection!'));
      return;
    }
    if (!imgUri) {
      dispatch(setErrorMsg('Something went wrong!'));
      return;
    }

    try {
      const shareOptions: ShareOptions = {
        url: imgUri,
        type: 'image/png',
        title: 'My Paletti Color Collection ✨ - Check it out!',
        filename: 'Paletti Collection',
        subject: 'My Paletti Color Collection ✨ - Check it out!',
        // message: 'My Paletti Color Collection ✨ - Check it out!',
      };

      await RNShare.open(shareOptions);
    } catch (err) {
      // console.log(err);
    }
  };

  const savePalette = async () => {
    if (!collection || Object.keys({...collection})?.length <= 0) {
      dispatch(setErrorMsg('You have no colors in your collection!'));
      return;
    }
    if (!imgUri) {
      dispatch(setErrorMsg('Something went wrong!'));
      return;
    }

    CameraRoll.save(imgUri, {type: 'photo', album: 'Paletti'});
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

        <TouchableOpacity style={[styles.actionBtn]} onPress={savePalette}>
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
