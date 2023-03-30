import {Screen} from './utils/Screen';
import {RootStore} from './RootStore';
import {RootTabParams} from '../types';
import {makeAutoObservable} from 'mobx';
import {Alert, Linking} from 'react-native';
import {LoadingState} from './utils/LoadingState';
import {Camera} from 'react-native-vision-camera';

export class AppStore {
  rootStore: RootStore;

  initialRouteName: keyof RootTabParams = Screen.SPLASH;
  loadingState: LoadingState = LoadingState.PENDING;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  //======================
  // Actions
  //======================
  setLoadingState(loadingState: LoadingState) {
    this.loadingState = loadingState;
  }
  setInitialRouteName(route: keyof RootTabParams) {
    this.initialRouteName = route;
  }

  //======================
  // API
  //======================
  async init() {
    await this.initializeRouteName();
    this.setLoadingState(LoadingState.DONE);
  }

  async requestCameraAccess() {
    try {
      const result = await Camera.requestCameraPermission();
      if (result === 'authorized') {
        return true;
      } else {
        await Linking.openSettings();
        return false;
      }
    } catch (e) {
      Alert.alert(
        'Failed to request permission!',
        'Failed to request Camera permission. Please verify that you have granted Camera Permission in your Settings app.',
      );
      await Linking.openSettings();
      return false;
    }
  }

  //======================
  // Rest
  //======================
  private async initializeRouteName() {
    const result = await Camera.getCameraPermissionStatus();
    if (result === 'authorized') {
      this.setInitialRouteName(Screen.HOME);
    } else {
      this.setInitialRouteName(Screen.SPLASH);
    }
  }
}
