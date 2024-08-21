import React, { useEffect, useState } from "react";
import Header from "./Header";
import Chip from "@mui/material/Chip";
import "./HomePage.css";
import GenrePage from "./GenrePage";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Divider from "@mui/joy/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import MovieDetails from "./MovieDetails";
import { useNavigate } from "react-router-dom";
import {
  addFavoriteMovies,
  removeFavoriteMovies,
  showSelectedPopularMovie,
} from "../redux/slices/MoviesSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

interface genreData {
  id: number;
  name: string;
}

interface popularMovies {
  title: string;
  vote_average: number;
  poster_path: string;
  id?: string;
}

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTc0N2FhY2RiMGY5NGMzZDZmYWQxMmJmN2QzNGQzMCIsIm5iZiI6MTcyMDU1MTM1NS45NTQzODQsInN1YiI6IjY0YjRlYTAyZTBjYTdmMDE0NDJhZTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j6h_wbXPT3AD16sbuIdk-lagOdThRgSCLHcm4t03dQM";

const HomePage = () => {
  const [genresList, setGenresList] = useState<genreData[]>([]);
  const [showGenrePage, setShowGenrePage] = useState(false);
  const [popularMoviesList, setPopularMoviesList] = useState<popularMovies[]>(
    []
  );
  const [allTrendingMovies, setAllTrendingMovies] = useState<popularMovies[]>(
    []
  );
  const [showAllmMovies, setShowAllMovies] = useState(false);
  const [showSelectedMovieInfo, setShowSelectedMovieInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showSelectedGenreList, setShowSelectedGenreList] = useState<
    popularMovies[]
  >([]);
  const [genreTitle, setGenreTitle] = useState("");
  const addMovieToFavList = useSelector(
    (state: RootState) => state.moviesState.favMovies
  );

  useEffect(() => {
    fetchGenres();
    fetchPopularMovies();
  }, []);

  const fetchGenres = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setGenresList(data.genres);
    }
  };

  const handleGenreClick = async (genre: genreData) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setShowGenrePage(true);
      setShowSelectedGenreList(data.results);
    }
    const title = genresList.filter((item: genreData) => item.id === genre.id);
    setGenreTitle(title[0].name);
  };

  const fetchPopularMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setPopularMoviesList(data.results);
    }
  };

  const fetchAllMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setAllTrendingMovies(data.results);
      setShowAllMovies(true);
    }
  };

  const showMovieDetailsHandler = (item: any) => {
    // window.open("/movie_details", "_blank");
    // dispatch(showSelectedPopularMovie(item));
    setSelectedMovie(item);
    setShowSelectedMovieInfo(true);
  };

  const handleFavoriteMovie = (movie: any) => {
    const isFavorite = addMovieToFavList.some(
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
      {!showGenrePage && !showSelectedMovieInfo && (
        <>
          <Header />
          <div className="subHeader">
            {genresList.map((genre: genreData) => (
              <Chip
                key={genre.id}
                label={genre.name}
                onClick={() => handleGenreClick(genre)}
                // onClick={() => window.open(`/genre/${genre.id}`, "_blank")}
                style={{ margin: "5px" }}
              />
            ))}
          </div>
          <div className="movies-list">
            <Box
              sx={{
                display: "flex",
                gap: 1,
                py: 1,
                overflow: "auto",
                width: 1270,
                scrollSnapType: "x mandatory",
                "& > *": {
                  scrollSnapAlign: "center",
                },
                "::-webkit-scrollbar": { display: "none" },
              }}
            >
              {popularMoviesList.map((item: popularMovies) => (
                <Card
                  orientation="vertical"
                  size="sm"
                  key={item.title}
                  variant="outlined"
                >
                  <AspectRatio ratio="4/3" sx={{ width: 280 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                      alt={item.title}
                      onClick={() => showMovieDetailsHandler(item)}
                      // onClick={() => window.open(`/movie_details`, '_blank')}
                      className="movie-image"
                    />
                  </AspectRatio>
                  <Box
                    sx={{
                      whiteSpace: "wrap",
                      mx: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography level="title-md">{item.title}</Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </div>
          {!showAllmMovies && (
            <div className="all-movies-button">
              <Button variant="contained" onClick={fetchAllMovies}>
                All Movies
              </Button>
            </div>
          )}
          {showAllmMovies && (
            <div className="movies-list">
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  py: 1,
                  overflow: "auto",
                  width: 1270,
                  scrollSnapType: "x mandatory",
                  "& > *": {
                    scrollSnapAlign: "center",
                  },
                  "::-webkit-scrollbar": { display: "none" },
                }}
              >
                {allTrendingMovies.map((item: popularMovies) => (
                  <Card
                    orientation="vertical"
                    size="sm"
                    key={item.id}
                    variant="outlined"
                  >
                    <AspectRatio ratio="4/3" sx={{ width: 280 }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title}
                        onClick={() => showMovieDetailsHandler(item)}
                        // onClick={() => window.open(`/movie_details`, "_blank")}
                        className="movie-image"
                      />
                    </AspectRatio>
                    <Box sx={{ whiteSpace: "wrap", mx: 2 }}>
                      <Typography level="title-md">{item.title}</Typography>
                      &nbsp;&nbsp;
                      <Divider orientation="vertical" />
                      &nbsp;&nbsp;
                      <Typography level="title-md">
                        {Math.round(item.vote_average * 10) / 10}
                      </Typography>
                      <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        sx={{ ml: "auto", alignSelf: "flex-start" }}
                        onClick={() => handleFavoriteMovie(item)}
                      >
                        {addMovieToFavList.some(
                          (movie: any) => movie.id === item.id
                        ) ? (
                          <FavoriteIcon className="red-fav-icon" />
                        ) : (
                          <FavoriteBorderRoundedIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </Box>
            </div>
          )}
        </>
      )}
      {showGenrePage && (
        <GenrePage
          showSelectedGenre={showSelectedGenreList}
          genreTitle={genreTitle}
        />
      )}
      {showSelectedMovieInfo && <MovieDetails selectedMovie={selectedMovie} />}
    </>
  );
};

export default HomePage;
