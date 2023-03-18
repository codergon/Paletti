import {
  User,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {AppDispatch} from '..';
import {auth, db} from '../../fb';
import {createSlice} from '@reduxjs/toolkit';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  userData:
    | (User & {
        level: number;
        matricNo: string;
        department: string;
        accountType: string;
        userName: string;
      })
    | null;

  isPending: boolean;
}

const initialState = {
  userData: null,
  isPending: false,
} as UserState;

export const userSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = {
        ...action.payload,
        level: Number(action.payload.level),
      };
    },
    setIsPending: (state, action) => {
      state.isPending = action.payload;
    },
  },
});

type userDataType = {
  email: string;
  password: string;
  userName: string;
  photoURL: string;
  displayName: string;
};

export const SignInUser =
  (userData: {password: string; email: string}) =>
  async (dispatch: AppDispatch) => {
    const {password, email} = userData;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const docRef = doc(db, 'users', userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    await AsyncStorage.multiSet([
      ['uid', data?.uid],
      ['email', data?.email],
      ['level', data?.level + ''],
      ['matricNo', data?.matricNo],
      ['userName', data?.userName],
      ['department', data?.department],
      ['accountType', data?.accountType],
      ['photoURL', data?.photoURL || ''],
      ['displayName', data?.displayName || ''],
    ]);
    dispatch(setUserData(data));
  };

export const RegisterUser =
  (userData: userDataType) => async (dispatch: AppDispatch) => {
    const {password, userName, email} = userData;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const data = {
      email,
      userName,
      uid: userCredential.user.uid,
      photoURL: userCredential.user.photoURL,
      displayName: userCredential.user.displayName,
    };

    // console.log(data);

    await setDoc(doc(db, 'users', userCredential.user.uid), data);

    await AsyncStorage.multiSet([
      ['uid', data.uid],
      ['email', data.email],
      ['userName', data.userName],
      ['photoURL', data?.photoURL || ''],
      ['displayName', data?.displayName || ''],
    ]);
    dispatch(setUserData(data));
    await sendEmailVerification(userCredential.user);
  };

export const {setUserData, setIsPending} = userSlice.actions;
export default userSlice.reducer;
