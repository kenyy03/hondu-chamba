import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import categoryReducer from './features/categorySlice';
import habilitiesReducer from './features/habilitiesSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    categoryReducer,
    habilitiesReducer,
  },
});

