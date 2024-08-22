import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./Header.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { showLogoutConfirmation } from "../redux/slices/MoviesSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(showLogoutConfirmation());
  };

  return (
    <header className="main-header">
      <h1 onClick={() => navigate("/home")}>TMDB Movies</h1>
      <nav className="navigation-menu">
        <ul>
          <li>
            <h3 onClick={() => navigate("/favourites")}>My Favourites</h3>
          </li>
          <li>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small">
                  <Avatar src="/broken-image.jpg" className="avatar-style" />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
