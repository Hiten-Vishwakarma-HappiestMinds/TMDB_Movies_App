import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  showLogoutConfirmation: boolean;
  selectedPopularMovie: any;
  favMovies: any;
}

const initialState: MovieState = {
  showLogoutConfirmation: false,
  selectedPopularMovie: [],
  favMovies: [],
};

const moviesSlice = createSlice({
  name: "moviesState",
  initialState,
  reducers: {
    showLogoutConfirmation: (state: MovieState) => {
      state.showLogoutConfirmation = true;
    },
    hideLogoutConfirmation: (state: MovieState) => {
      state.showLogoutConfirmation = false;
    },
    showSelectedPopularMovie: (
      state: MovieState,
      action: PayloadAction<any>
    ) => {
      const  selectedMovie = action.payload;
      console.log('selected', selectedMovie);
      if(selectedMovie) {
        state.selectedPopularMovie = selectedMovie;
      }
    },
    addFavoriteMovies: (state: MovieState, action: PayloadAction<any>) => {
      const newFavMovies = action.payload;
      console.log('newFavMovies', newFavMovies);
      
      const exists = state.favMovies.some(
        (favMovie: any) => favMovie.id === newFavMovies.id
      );
      if (!exists) {
        state.favMovies.push(newFavMovies);
      }
    },
    removeFavoriteMovies: (state, action) => {
      const movieId = action.payload;
      // Filter out the movie with the given ID
      state.favMovies = state.favMovies.filter(
        (movie: any) => movie.id !== movieId
      );
    },
  },
});

export const {
  showLogoutConfirmation,
  hideLogoutConfirmation,
  showSelectedPopularMovie,
  addFavoriteMovies,
  removeFavoriteMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
