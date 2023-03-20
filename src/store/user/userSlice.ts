import {createSlice} from '@reduxjs/toolkit';

export type UserDataType = {
  email: string;
  name: string;
  photo: string;
  id: string;
};

interface UserState {
  currentUser: UserDataType | null;
}

const initialState = {
  currentUser: null,
} as UserState;

export const userSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    // Set user data
    setUserData: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;
