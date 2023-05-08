import dayjs from 'dayjs';
import ntc from './lib/ntc';
import duration from 'dayjs/plugin/duration';

import App from './App';
import AppContextProvider from './context/AppContext';
import ShareContext from './context/ShareContext';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SettingsProvider from './context/SettingsContext';
import LogicProvider from './context/LogicContext';

ntc.init();
dayjs.extend(duration);

export const AppProvider = () => {
  return (
    <SettingsProvider>
      <AppContextProvider>
        <ShareContext>
          <LogicProvider>
            <SafeAreaProvider>
              <MenuProvider>
                <App />
              </MenuProvider>
            </SafeAreaProvider>
          </LogicProvider>
        </ShareContext>
      </AppContextProvider>
    </SettingsProvider>
  );
};
