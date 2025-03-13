import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice" 
import jobReducer from './slice/jobSlice';
import jobActionReducer from "./slice/jobActionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    jobActions: jobActionReducer,
  },
});

export default store;