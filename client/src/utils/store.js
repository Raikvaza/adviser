import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import imageReducer from './reducers/avatar';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    image: imageReducer,
  },
});