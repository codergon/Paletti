import App from './App';
import dayjs from 'dayjs';
import ntc from './lib/ntc';
import duration from 'dayjs/plugin/duration';
import ShareContext from './context/ShareContext';
import LogicProvider from './context/LogicContext';
import {MenuProvider} from 'react-native-popup-menu';
import AppContextProvider from './context/AppContext';
import SettingsProvider from './context/SettingsContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
