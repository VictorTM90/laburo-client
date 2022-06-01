import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { Link } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeContext } from "../context/theme.context";

function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      // contactar con el server para logear al usuario
      const response = await loginService(user);
      
      const { authToken, _id } = response;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("id", _id);

      props.setIsLoggedIn(true)
      navigate("/profile");

    } catch (err) {
      setErrorMessage(err.data.errorMessage)
    }
  };

  const handlePassWord = (e) => {
    setPassword(e.target.value)
    setErrorMessage()
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setErrorMessage()
  }


  
  return (
    <div className={styles.form}>
      <div className="login-container">
        <h2>LABURO</h2>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <ThemeProvider theme={theme}>
            <TextField
              id="standard-basic"
              label="email"
              variant="standard"
              color="btn"
              defaultValue="Small"
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            <br />

            <TextField
              id="standard-basic"
              label="password"
              variant="standard"
              color="btn"
              margin="normal"
              type="password"
              name="password"
              value={password}
              onChange={handlePassWord}
            />
            <br />
           

            <Button
              type="submit"
              size="small"
              color="primary"
              variant="contained"
              margin="normal"
            >
              Submit
            </Button>
          </ThemeProvider>
        </Box>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <p>¿Es tu primera vez en LABURO?</p>
        <Link to="/signup" color="grisazulado" underline="none">
          Signup
        </Link>
        <br />
        <br />
        
      </div>
    </div>
  );
}

export default Login;
