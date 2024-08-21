import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/MoviesSlice';

export const store = configureStore({
  reducer: {
    moviesState: moviesReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
