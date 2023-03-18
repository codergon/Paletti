import ntc from './lib/ntc';
import 'react-native-get-random-values';

import dayjs from 'dayjs';
import {auth} from './fb';
import {store} from './store';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './navigation';
import {useEffect, useState} from 'react';
import duration from 'dayjs/plugin/duration';
import {getAllAsync} from './helpers/common';
import Loader from './components/common/Loader';
import {useAppDispatch} from './hooks/storeHooks';
import {setUserData} from './store/user/userSlice';
import {onAuthStateChanged, User} from 'firebase/auth';
import useColorScheme from './hooks/useColorScheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

dayjs.extend(duration);
ntc.init();

const Compo = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const isLoadingComplete = true;
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    const subscriber = onAuthStateChanged(auth, async userData => {
      const storedUser = await getAllAsync([
        'uid',
        'email',
        'userName',
        'photoURL',
        'displayName',
      ]);

      setUser(userData);
      if (userData) dispatch(setUserData(storedUser));
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (!isLoadingComplete || initializing) {
    return <Loader />;
  } else {
    return (
      <SafeAreaProvider>
        {!user && false ? <></> : <Navigation colorScheme={colorScheme} />}
      </SafeAreaProvider>
    );
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <Compo />
      </BottomSheetModalProvider>
    </Provider>
  );
}
