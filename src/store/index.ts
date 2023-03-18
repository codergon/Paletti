import user from './user/userSlice';
import profile from './profile/profileSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {user, profile},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
