import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  showLogoutConfirmation: boolean;
}

const initialState: AppState = {
  showLogoutConfirmation: false,
};

const moviesSlice = createSlice({
  name: "moviesApp",
  initialState,
  reducers: {
    showLogoutConfirmation: (state: AppState) => {
      state.showLogoutConfirmation = true;
    },
    hideLogoutConfirmation: (state: AppState) => {
      state.showLogoutConfirmation = false;
    },
  },
});

export const { showLogoutConfirmation, hideLogoutConfirmation } =
  moviesSlice.actions;

export default moviesSlice.reducer;
