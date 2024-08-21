import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./login/LoginPage";
import HomePage from "./Home/HomePage";
import LogoutPopup from "./logout/LogoutPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { hideLogoutConfirmation } from "./redux/slices/MoviesSlice";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MyFavourites from "./Home/MyFavourites";
import GenrePage from "./Home/GenrePage";
import MovieDetails from "./Home/MovieDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const showPopup = useSelector(
    (state: RootState) => state.moviesState.showLogoutConfirmation
  );
  const isAuthenticated = localStorage.getItem("User_ID") !== null;

  const handleConfirmLogout = () => {
    localStorage.removeItem("User_ID");
    setIsLoggedIn(false);
    dispatch(hideLogoutConfirmation());
  };

  const handleCancelLogout = () => {
    dispatch(hideLogoutConfirmation());
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <div className="App">
                  <LoginPage isLoggedIn={setIsLoggedIn} />
                </div>
              )
            }
          />
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/favourites"
            element={isAuthenticated ? <MyFavourites /> : <Navigate to="/" />}
          />
          {/* <Route path="/movie_details" element={<MovieDetails />} /> */}
          {/* <Route path="/genre/:genreId" element={<GenrePage />} /> */}
        </Routes>
      </Router>
      {showPopup && (
        <LogoutPopup
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </>
  );
}

export default App;
