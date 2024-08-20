import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./Header.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { showLogoutConfirmation } from "../redux/slices/MoviesSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(showLogoutConfirmation());
  };
  
  const openHomePageInNewTab = () => {
    const homePageUrl = window.location.origin; // Adjust the path as necessary
    window.open(homePageUrl, "_blank");
  };

  return (
    <header className="main-header">
      <h1>
        <a onClick={openHomePageInNewTab}>TMDB Movies</a>
      </h1>
      <nav className="navigation-menu">
        <ul>
          <li>
            <a href="/">My Favourites</a>
          </li>
          <li>
            <a onClick={handleLogout}>
              <Avatar src="/broken-image.jpg" className="avatar-style" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
