import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { Link } from "react-router-dom";
import styles from "./LoginSignup.module.css"
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      // main: '#64748B',
      main: "#EB984E",
      contrastText: '#fff',
    },
  },
});

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token){
      navigate("/profile")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      // contactar con el server para logear al usuario
      const response = await loginService(user);
      const { authToken, _id } = response;

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("id", _id)

      navigate("/profile");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      }
    }
  };

  return (
    <div className={styles.form}>
     <div className="login-container">

      <h2>LABURO</h2>
      <form onSubmit={handleSubmit}>
      <div >

        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
      </div>

      <div >

        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      </div>
      <ThemeProvider theme={theme}>
        <Button type='submit' size="small" color="neutral" variant="contained">Submit</Button>
      </ThemeProvider>
      </form>

      <p>{errorMessage}</p>

      <p>¿Es tu primera vez en LABURO?</p>
      <Link to='/signup'>Signup</Link>
    </div>
     </div>
  );
}

export default Login;
