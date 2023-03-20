import dayjs from 'dayjs';
import ntc from './lib/ntc';
import {store} from './store';
import {Provider} from 'react-redux';
import Navigation from './navigation';
import 'react-native-get-random-values';
import {AppStorage} from './store/mmkv';
import {useEffect, useState} from 'react';
import duration from 'dayjs/plugin/duration';
import auth from '@react-native-firebase/auth';
import Loader from './components/common/Loader';
import {useAppDispatch} from './hooks/storeHooks';
import {setUserData} from './store/user/userSlice';
import useColorScheme from './hooks/useColorScheme';
import {setCollection} from './store/profile/profileSlice';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '293064589552-tsm8u0kl1gmghh16h43agdjo3vcu0k6o.apps.googleusercontent.com',
});

dayjs.extend(duration);
ntc.init();

const Compo = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any | null | undefined) => {
    const storedUser = AppStorage.getString('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (user) dispatch(setUserData(parsedUser));
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const SetCollection = async () => {
      const collectionStr = AppStorage.getString('collection');
      if (collectionStr) {
        const collection = JSON.parse(collectionStr);
        dispatch(setCollection(collection));
      }
    };
    SetCollection();

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return <Loader />;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
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
