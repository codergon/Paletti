import dayjs from 'dayjs';
import ntc from './lib/ntc';
import duration from 'dayjs/plugin/duration';

import App from './App';
import {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {MMKVStorage} from './store/utils/mmkv';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStore, RootStoreProvider} from './store/RootStore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '293064589552-tsm8u0kl1gmghh16h43agdjo3vcu0k6o.apps.googleusercontent.com',
});

dayjs.extend(duration);
ntc.init();

const rootStore = new RootStore({
  storage: MMKVStorage,
});

export const AppProvider = observer(() => {
  useEffect(() => {
    rootStore.initApp();
  }, []);

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </RootStoreProvider>
  );
});
