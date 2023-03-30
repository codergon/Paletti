import {getFirestore} from 'firebase/firestore';
import {getAuth, setPersistence} from 'firebase/auth';
import {initializeApp, getApps, getApp} from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleAuthProvider,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

import {
  FIREBASE_STORAGEBUCKET,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_APIKEY,
  FIREBASE_APPID,
  FIREBASE_PROJECTID,
  FIREBASE_MEASUREMENTID,
  FIREBASE_MESSAGINGSENDERID,
} from '@env';

const firebaseConfig = {
  projectId: FIREBASE_PROJECTID,
  measurementId: FIREBASE_MEASUREMENTID,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  authDomain: FIREBASE_AUTHDOMAIN,
  apiKey: FIREBASE_APIKEY,
  appId: FIREBASE_APPID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

(async () => {
  await setPersistence(auth, getReactNativePersistence(AsyncStorage));
})();

const db = getFirestore();
// const storage = getStorage(app);
var provider = new GoogleAuthProvider();

export {db, auth, provider};
