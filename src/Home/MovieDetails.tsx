import React from "react";
import "./MovieDetails.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addFavoriteMovies,
  removeFavoriteMovies,
} from "../redux/slices/MoviesSlice";

interface IMovieDetailsProps {
  selectedMovie: any;
}

const MovieDetails = (props: IMovieDetailsProps) => {
  const dispatch = useDispatch();
  const addFavMovie = useSelector(
    (state: RootState) => state.moviesState.favMovies
  );

  const handleAddFavorite = () => {
    const isFavorite = addFavMovie.some(
      (favMovie: any) => favMovie.id === props.selectedMovie.id
    );
    if (isFavorite) {
      dispatch(removeFavoriteMovies(props.selectedMovie.id));
    } else {
      dispatch(addFavoriteMovies(props.selectedMovie));
    }
  };

  return (
    <>
      <div className="movie-details-image-container">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.selectedMovie.poster_path}`}
            loading="lazy"
            alt=""
            className="movie-details-image"
          />
        </div>
      </div>
      <div>
        <span className="movie-title">
          {props.selectedMovie && props.selectedMovie.title} |{" "}
          {props.selectedMovie &&
            Math.round(props.selectedMovie.vote_average * 10) / 10}
        </span>
        {addFavMovie.some((item: any) => item.id === props.selectedMovie.id) ? (
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
        <p>{props.selectedMovie && props.selectedMovie.overview}</p>
      </div>
    </>
  );
};

export default MovieDetails;
