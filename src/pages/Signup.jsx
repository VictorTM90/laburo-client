import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
import styles from "./LoginSignup.module.css";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { ThemeContext } from "../context/theme.context";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // enviar usuario al backend para crear el registro
    const user = { name, email, password };
    try {
      await signupService(user);
      navigate("/login");
    } catch (err) {
      // el ? es por si no hay response que no pete el código y sigue para adelante
      if (err.response?.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
        console.log(errorMessage);
      }
    }
  };
  return (
    <div className={styles.form}>
      <h3>LABURO</h3>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/*<form > */}
        <ThemeProvider theme={theme}>
          <TextField
            id="standard-basic"
            label="name"
            variant="standard"
            type="text"
            color="btn"
            defaultValue="Small"
            margin="normal"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            type="text"
            color="btn"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            type="password"
            color="btn"
            margin="normal"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <Button type="submit" size="small" color="primary" variant="contained">
            Submit
          </Button>
        </ThemeProvider>
      </Box>
      {/* // </form> */}

      <p>{errorMessage}</p>
      <p>
        Si ya tienes una cuenta en LABURO <br />
        ve a 
        <span>
        <Link to="/login" color="grisazulado" underline="none">
          Login
        </Link>
        </span>
      </p>
    </div>
  );
}

export default Signup;
