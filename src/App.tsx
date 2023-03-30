import Navigation from './navigation';
import 'react-native-get-random-values';
import useColorScheme from './hooks/useColorScheme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {useStores} from './store/RootStore';
import {LoadingStateSwitcher} from './components/common/LoadingStateSwitcher';

export default function App() {
  const rootStore = useStores();
  const colorScheme = useColorScheme();

  return (
    <BottomSheetModalProvider>
      <LoadingStateSwitcher loadingState={rootStore.appStore.loadingState}>
        <Navigation colorScheme={colorScheme} />
      </LoadingStateSwitcher>
    </BottomSheetModalProvider>
  );
}
