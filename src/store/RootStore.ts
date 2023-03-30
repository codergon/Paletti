import {makeAutoObservable} from 'mobx';
import {createContext, useContext} from 'react';

import {AppStore} from './AppStore';
import {UserStore} from './UserStore';
import {Services} from './utils/Services';
import {CollectionStore} from './CollectionStore';

export class RootStore {
  appStore: AppStore;
  services: Services;
  userStore: UserStore;
  collectionStore: CollectionStore;

  constructor(services: Services) {
    makeAutoObservable(this);
    this.services = services;
    this.appStore = new AppStore(this);
    this.userStore = new UserStore(this);
    this.collectionStore = new CollectionStore(this);
  }

  async initApp() {
    await this.appStore.init();
  }
}

export const RootStoreContext = createContext<RootStore>({} as RootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);
