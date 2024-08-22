import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  showLogoutConfirmation: boolean;
  favMovies: any;
  genreList: any;
  genreTitle: string;
  movieDetails: any;
}

const initialState: MovieState = {
  showLogoutConfirmation: false,
  favMovies: [],
  genreList: [],
  genreTitle: "",
  movieDetails: [],
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
    addFavoriteMovies: (state: MovieState, action: PayloadAction<any>) => {
      const newFavMovies = action.payload;
      const exists = state.favMovies.some(
        (favMovie: any) => favMovie.id === newFavMovies.id
      );
      if (!exists) {
        state.favMovies.push(newFavMovies);
      }
    },
    removeFavoriteMovies: (state: MovieState, action: PayloadAction<any>) => {
      const movieId = action.payload;
      // Filter out the movie with the given ID
      state.favMovies = state.favMovies.filter(
        (movie: any) => movie.id !== movieId
      );
    },
    showGenreList: (state: MovieState, action: PayloadAction<any>) => {
      state.genreList = action.payload;
    },
    showGenreTitle: (state: MovieState, action: PayloadAction<any>) => {
      state.genreTitle = action.payload;
    },
    showMovieDetails: (state: MovieState, action: PayloadAction<any>) => {
      state.movieDetails.push(action.payload);
    },
  },
});

export const {
  showLogoutConfirmation,
  hideLogoutConfirmation,
  addFavoriteMovies,
  removeFavoriteMovies,
  showGenreList,
  showGenreTitle,
  showMovieDetails,
} = moviesSlice.actions;

export default moviesSlice.reducer;
