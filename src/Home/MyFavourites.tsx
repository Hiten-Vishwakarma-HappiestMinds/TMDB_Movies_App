import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import './MyFavourites.css';

const MyFavourites = () => {
  const favMovie = useSelector(
    (state: RootState) => state.moviesState.favMovies
  );
  return (
    <div className="fav-movie-container">
      <h1>My Favourites</h1>
      <div className="fav-movie-grid">
        {favMovie.map((movie: any) => (
          <Card key={movie.id} variant="outlined" sx={{ width: 200 }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="title-md">{movie.title}</Typography>
            </CardContent>
            <CardOverflow variant="soft">
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography level="body-xs">
                  {Math.round(movie.vote_average * 10) / 10} rating
                </Typography>
              </CardContent>
            </CardOverflow>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
