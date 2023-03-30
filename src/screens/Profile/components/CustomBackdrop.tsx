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
import {observer} from 'mobx-react-lite';
import {StatusMsg} from '../../../types/profile';
import {MdText} from '../../../components/StyledText';
import {useStores} from '../../../store/RootStore';
import RNShare, {ShareOptions} from 'react-native-share';
import {FloppyDisk, Share, X} from 'phosphor-react-native';
import {hapticFeedback} from '../../../utils/hapticFeedback';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {BottomSheetBackdropProps, useBottomSheet} from '@gorhom/bottom-sheet';

const CustomBackdrop = observer(
  ({animatedIndex, style}: BottomSheetBackdropProps) => {
    const store = useStores();
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

    const showStatusMsg = (data: StatusMsg) => {
      store.collectionStore.setStatusMsg(data);

      setTimeout(() => {
        store.collectionStore.setStatusMsg(undefined);
      }, 3000);
    };

    const sharePalette = async () => {
      if (store.collectionStore.collection?.length === 0) {
        showStatusMsg({
          type: 'error',
          message: 'You have no colors in your collection!',
        });
        return;
      }
      if (!store.collectionStore.imgUri) {
        showStatusMsg({
          type: 'error',
          message: 'Something went wrong!',
        });
        return;
      }

      try {
        const shareOptions: ShareOptions = {
          url: store.collectionStore.imgUri,
          type: 'image/png',
          filename: 'Paletti Collection',
          title: 'My Paletti Color Collection ✨ - Check it out!',
          subject: 'My Paletti Color Collection ✨ - Check it out!',
          // message: 'My Paletti Color Collection ✨ - Check it out!',
        };

        await RNShare.open(shareOptions);
        showStatusMsg({
          type: 'success',
          message: 'Collection shared successfully!',
        });
      } catch (err: any) {
        showStatusMsg({
          type: 'error',
          message:
            err?.message === 'User did not share'
              ? 'You cancelled the share!'
              : err?.message || 'An error occurred!',
        });
      } finally {
        hapticFeedback('rigid');
      }
    };

    const savePalette = async () => {
      if (store.collectionStore.collection?.length === 0) {
        showStatusMsg({
          type: 'error',
          message: 'You have no colors in your collection!',
        });
        return;
      }
      if (!store.collectionStore.imgUri) {
        showStatusMsg({
          type: 'error',
          message: 'Something went wrong!',
        });
        return;
      }

      try {
        await CameraRoll.save(store.collectionStore.imgUri, {
          type: 'photo',
          album: 'Paletti',
        });
        showStatusMsg({
          type: 'success',
          message: 'Saved to your gallery!',
        });
      } catch (err) {
        showStatusMsg({
          type: 'error',
          message: 'Something went wrong!',
        });
      } finally {
        hapticFeedback('notificationSuccess');
      }
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
              onPress={sharePalette}>
              <Share
                size={26}
                weight="bold"
                color={
                  store.collectionStore.collection?.length > 0 ? '#fff' : '#888'
                }
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionBtn]} onPress={savePalette}>
              <FloppyDisk
                size={26}
                weight="bold"
                color={
                  store.collectionStore.collection?.length > 0 ? '#fff' : '#888'
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusMsgCover}>
          {(store.collectionStore.statusMsg?.message?.length || 0) > 0 ? (
            <Animated.View
              exiting={FadeOut}
              entering={SlideInDown}
              style={styles.blockCenter}>
              <MdText
                style={[
                  store.collectionStore.statusMsg?.type === 'error'
                    ? styles.warning_text
                    : store.collectionStore.statusMsg?.type === 'success'
                    ? styles.success_text
                    : styles.normal_text,
                ]}>
                {store.collectionStore.statusMsg?.message}
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
  },
);

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
