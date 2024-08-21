import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import "./LoginPage.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface ILoginPageProps {
  isLoggedIn: (data: boolean) => void;
}

const LoginPage = (props: ILoginPageProps) => {
  const [userEmail, setUserEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  function handleLoginEvent() {
    if (userEmail !== "" && enteredPassword !== "") {
      handleValidation();
    } else {
      setIsInvalid(true);
      setErrorMessage("Please enter valid email & password!");
    }
  }

  function handleValidation() {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      userEmail.includes("@") &&
      enteredPassword.length >= 6 &&
      upperCasePattern.test(enteredPassword) &&
      lowerCasePattern.test(enteredPassword) &&
      numberPattern.test(enteredPassword) &&
      specialCharPattern.test(enteredPassword)
    ) {
      localStorage.setItem("User_ID", `${userEmail}${enteredPassword}`);
      setErrorMessage("");
      navigate('/home');
      props.isLoggedIn(true);
    } else {
      setIsInvalid(true);
      setErrorMessage("Invalid user email and password!!");
    }
  }

  return (
    <div className="login-control">
      <span className="avatar-style">
        <Avatar src="/broken-image.jpg" />
      </span>
      <div>
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <TextField
            value={userEmail}
            id="input-with-sx"
            label="User email"
            variant="standard"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <TextField
            value={enteredPassword}
            id="input-with-sx"
            label="Password"
            variant="standard"
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </Box>
        <FormHelperText
          id="component-error-text"
          error={isInvalid}
          className="error-text"
        >
          {errorMessage}
        </FormHelperText>
        <Button
          variant="contained"
          className="login-style"
          onClick={handleLoginEvent}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
