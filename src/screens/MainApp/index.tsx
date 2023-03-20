import MainApp from './mainapp';
import Profile from '../Profile';
import {StyleSheet} from 'react-native';
import Layout from '../../constants/Layout';
import {edges} from '../../helpers/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from 'react';
import {RootStackScreenProps} from '../../types/types';
import {MODAL_BACKGROUND} from '../../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomBackdrop from '../Profile/components/CustomBackdrop';
import SignInModal from '../../components/layouts/SignInModal';
import CustomSignInBackdrop from '../Profile/components/CustomSignInBackdrop';

const MainAppEntry = ({navigation}: RootStackScreenProps<'MainApp'>) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const signInBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => [Layout.window.height - insets.top - 120],
    [],
  );
  const openModal = () => bottomSheetRef?.current?.expand();
  const openSignInModal = () => signInBottomSheetRef?.current?.expand();

  return (
    <>
      <MainApp navigation={navigation} openProfile={openModal} />
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backdropComponent={CustomBackdrop}
        backgroundStyle={[styles.bottomSheet]}>
        <Profile openSignInModal={openSignInModal} />
      </BottomSheet>

      <BottomSheet
        index={-1}
        snapPoints={[200]}
        ref={signInBottomSheetRef}
        enablePanDownToClose={true}
        handleComponent={() => null}
        backdropComponent={CustomSignInBackdrop}
        backgroundStyle={[styles.signInBottomSheet]}>
        <SignInModal />
      </BottomSheet>
    </>
  );
};

export default MainAppEntry;

const styles = StyleSheet.create({
  bottomSheet: {
    ...edges(40, 0),
    backgroundColor: MODAL_BACKGROUND,
  },
  signInBottomSheet: {
    ...edges(40, 0),
    backgroundColor: 'transparent',
  },
});
