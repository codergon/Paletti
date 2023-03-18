import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {getAuth, setPersistence} from 'firebase/auth';
import {initializeApp, getApps, getApp} from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleAuthProvider,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

const firebaseConfig = {
  projectId: 'collens-808ad',
  measurementId: 'G-BG71VM2R4B',
  messagingSenderId: '166534297832',
  storageBucket: 'collens-808ad.appspot.com',
  authDomain: 'collens-808ad.firebaseapp.com',
  apiKey: 'AIzaSyCr3C4VlV-my8wk-0RKeQzlwiRo4RbyhAs',
  appId: '1:166534297832:web:d655572bc8ed71c483315d',
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
