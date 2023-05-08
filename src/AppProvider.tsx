import dayjs from 'dayjs';
import ntc from './lib/ntc';
import duration from 'dayjs/plugin/duration';

import App from './App';
import AppContextProvider from './context/AppContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AuthContextProvider from './context/AuthContext';
import SheetProvider from './context/SheetContext';

GoogleSignin.configure({
  webClientId:
    '293064589552-tsm8u0kl1gmghh16h43agdjo3vcu0k6o.apps.googleusercontent.com',
});

dayjs.extend(duration);
ntc.init();

export const AppProvider = () => {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <SheetProvider>
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        </SheetProvider>
      </AppContextProvider>
    </AuthContextProvider>
  );
};
