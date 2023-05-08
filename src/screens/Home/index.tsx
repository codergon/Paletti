import MainApp from './home';
import Profile from '../Profile';
import {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {edges} from '../../helpers/styles';
import Layout from '../../constants/Layout';
import BottomSheet from '@gorhom/bottom-sheet';
import ColorModal from '../Profile/modals/ColorModal';
import {RootStackScreenProps} from '../../types';
import {MODAL_BACKGROUND} from '../../constants/Colors';
import SignInModal from '../../components/layouts/SignInModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomBackdrop from '../Profile/components/CustomBackdrop';
import CustomOverlayBackdrop from '../Profile/components/CustomOverlayBackdrop';
import NewColorModal from '../Profile/modals/NewColorModal';
import {Hue} from '../../types/profile';

type ModalsProps = {
  openModal?: (modal: string) => void;
  bottomRef: React.RefObject<BottomSheet>;
};

const Modals = ({bottomRef}: ModalsProps) => {
  const insets = useSafeAreaInsets();
  const colorBottomSheetRef = useRef<BottomSheet>(null);
  const signInBottomSheetRef = useRef<BottomSheet>(null);
  const newColorBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => [Layout.window.height - insets.top - 120],
    [],
  );

  const openColorModal = useCallback(() => {
    colorBottomSheetRef?.current?.expand();
  }, [colorBottomSheetRef?.current]);

  const openSignInModal = useCallback(() => {
    signInBottomSheetRef?.current?.expand();
  }, [signInBottomSheetRef?.current]);

  const openNewColorModal = useCallback(() => {
    newColorBottomSheetRef?.current?.expand();
  }, [newColorBottomSheetRef?.current]);

  return (
    <>
      <BottomSheet
        index={-1}
        ref={bottomRef}
        enableOverDrag={false}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backdropComponent={CustomBackdrop}
        backgroundStyle={[styles.bottomSheet]}>
        <Profile
          openColorModal={openColorModal}
          openSignInModal={openSignInModal}
          openNewColorModal={openNewColorModal}
        />
      </BottomSheet>

      <BottomSheet
        index={-1}
        snapPoints={[200]}
        enableOverDrag={false}
        ref={signInBottomSheetRef}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backdropComponent={CustomOverlayBackdrop()}
        backgroundStyle={[styles.signInBottomSheet]}>
        <SignInModal />
      </BottomSheet>

      <BottomSheet
        index={-1}
        snapPoints={['90%']}
        enableOverDrag={false}
        ref={colorBottomSheetRef}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backdropComponent={CustomOverlayBackdrop(0.3, false)}
        backgroundStyle={[styles.colorDetailsModal]}>
        <ColorModal />
      </BottomSheet>

      <BottomSheet
        index={-1}
        snapPoints={['90%']}
        enableOverDrag={false}
        ref={newColorBottomSheetRef}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backdropComponent={CustomOverlayBackdrop(0.3, false)}
        backgroundStyle={[styles.colorDetailsModal]}>
        <NewColorModal />
      </BottomSheet>
    </>
  );
};

const Home = ({navigation}: RootStackScreenProps<'home'>) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openModal = () => {
    bottomSheetRef?.current?.expand();
  };

  return (
    <>
      <MainApp navigation={navigation} openProfile={openModal} />

      <Modals bottomRef={bottomSheetRef} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  bottomSheet: {
    ...edges(40, 0),
    backgroundColor: MODAL_BACKGROUND,
  },
  signInBottomSheet: {
    ...edges(40, 0),
    backgroundColor: 'transparent',
  },
  colorDetailsModal: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});
