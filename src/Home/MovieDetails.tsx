import React from "react";
import "./MovieDetails.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addFavoriteMovies,
  removeFavoriteMovies,
} from "../redux/slices/MoviesSlice";
import Header from "./Header";

const MovieDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addFavMovie = useSelector(
    (state: RootState) => state.moviesState.favMovies
  );
  const movieDetails = useSelector(
    (state: RootState) => state.moviesState.movieDetails
  );

  const handleAddFavorite = () => {
    const isFavorite = addFavMovie.some(
      (favMovie: any) => favMovie.id === movieDetails[0].id
    );
    if (isFavorite) {
      dispatch(removeFavoriteMovies(movieDetails[0].id));
    } else {
      dispatch(addFavoriteMovies(movieDetails[0]));
    }
  };

  return (
    <>
      <Header />
      <div className="movie-details-image-container">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails[0].poster_path}`}
            loading="lazy"
            alt=""
            className="movie-details-image"
          />
        </div>
      </div>
      <div>
        <span className="movie-title">
          {movieDetails && movieDetails[0].title} |{" "}
          {movieDetails && Math.round(movieDetails[0].vote_average * 10) / 10}
          /10
        </span>
        {addFavMovie.some((item: any) => item.id === movieDetails[0].id) ? (
          <span
            className="red-favourite-icon favourite-icon"
            onClick={handleAddFavorite}
          >
            <FavoriteIcon />
          </span>
        ) : (
          <span className="favourite-icon" onClick={handleAddFavorite}>
            <FavoriteBorderIcon />
          </span>
        )}
      </div>
      <div className="movie-overview">
        <p>{movieDetails && movieDetails[0].overview}</p>
      </div>
    </>
  );
};

export default MovieDetails;
