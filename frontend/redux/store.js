import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import categoryReducer from './features/categorySlice';

export const store = configureStore({
  reducer: {
    userReducer,
    categoryReducer,
  },
});

