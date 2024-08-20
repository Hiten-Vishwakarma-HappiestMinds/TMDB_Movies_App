import React, { useState } from "react";
import "./App.css";
import LoginPage from "./login/LoginPage";
import HomePage from "./Home/HomePage";
import LogoutPopup from "./logout/LogoutPopup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { hideLogoutConfirmation } from "./redux/slices/MoviesSlice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const showPopup = useSelector(
    (state: RootState) => state.moviesState.showLogoutConfirmation
  );

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
      {isLoggedIn && <HomePage />}
      <div className="App">
        {!isLoggedIn && <LoginPage isLoggedIn={setIsLoggedIn} />}
        {showPopup && (
          <LogoutPopup
            onConfirm={handleConfirmLogout}
            onCancel={handleCancelLogout}
          />
        )}
      </div>
    </>
  );
}

export default App;
