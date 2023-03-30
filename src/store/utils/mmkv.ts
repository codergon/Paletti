import {StorageController} from 'mobx-persist-store';
import {MMKV} from 'react-native-mmkv';

export const AppStorage = new MMKV();
export const MMKVStorage: StorageController = {
  setItem: (key, data) => AppStorage.set(key, data),
  getItem: key => AppStorage.getString(key) as string | null,
  removeItem: key => AppStorage.delete(key),
};
