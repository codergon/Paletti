import {AppStorage} from '../mmkv';
import {createSlice} from '@reduxjs/toolkit';
import {Collection} from '../../types/profile';

interface UserState {
  imgUri: string;
  errorMsg: string;
  collection: Collection | null;
}

const initialState = {
  imgUri: '',
  errorMsg: '',
  collection: null,
} as UserState;

export const profileSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setImgUri: (state, action) => {
      state.imgUri = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },

    // Set collection in storage
    setCollection: (state, action) => {
      state.collection = action.payload;
      AppStorage.set('collection', JSON.stringify(action.payload || ''));
    },
  },
});

export const {setImgUri, setErrorMsg, setCollection} = profileSlice.actions;
export default profileSlice.reducer;
