import React from "react";
import "./LogoutPopup.css";
import Button from "@mui/material/Button";

interface ILogoutPopup {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutPopup = (props: ILogoutPopup) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={props.onConfirm}
        >
          Yes
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="outlined"
          href="#outlined-buttons"
          onClick={props.onCancel}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default LogoutPopup;
