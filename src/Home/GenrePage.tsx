import "./GenrePage.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { useDispatch } from "react-redux";
import {
  addFavoriteMovies,
  removeFavoriteMovies,
} from "../redux/slices/MoviesSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Header from "./Header";

const GenrePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addFavMovie = useSelector(
    (state: RootState) => state.moviesState.favMovies
  );
  const addGenreList = useSelector(
    (state: RootState) => state.moviesState.genreList
  );
  const genreTitle = useSelector(
    (state: RootState) => state.moviesState.genreTitle
  );

  const handleAddFavorite = (movie: any) => {
    const isFavorite = addFavMovie.some(
      (favMovie: any) => favMovie.id === movie.id
    );
    if (isFavorite) {
      dispatch(removeFavoriteMovies(movie.id));
    } else {
      dispatch(addFavoriteMovies(movie));
    }
  };

  return (
    <>
      <Header />
      <div className="genre-container">
        <h1>{genreTitle}</h1>
        <div className="movie-grid">
          {addGenreList &&
            addGenreList.map((movie: any) => (
              <Card key={movie.id} variant="outlined" sx={{ width: 200 }}>
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="soft"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                    }}
                    onClick={() => handleAddFavorite(movie)}
                  >
                    {addFavMovie.some((item: any) => item.id === movie.id) ? (
                      <FavoriteIcon className="red-fav-icon" />
                    ) : (
                      <FavoriteBorderRoundedIcon />
                    )}
                  </IconButton>
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md">{movie.title}</Typography>
                </CardContent>
                <CardOverflow variant="soft">
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Typography level="body-xs">
                      {Math.round(movie.vote_average * 10) / 10}/10
                    </Typography>
                  </CardContent>
                </CardOverflow>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default GenrePage;
