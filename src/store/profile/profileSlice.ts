import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  imgUri: string;
}

const initialState = {
  imgUri: '',
} as UserState;

export const profileSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setImgUri: (state, action) => {
      state.imgUri = action.payload;
    },
  },
});

export const {setImgUri} = profileSlice.actions;
export default profileSlice.reducer;
