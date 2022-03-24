import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
import styles from "./LoginSignup.module.css"
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles'
import { Link } from "react-router-dom";

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
      main: "#EB984E",
      contrastText: '#fff',
    },
  },
});

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

      <form onSubmit={handleSubmit}>
<div>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
</div>

<div>

        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
</div>

<div>

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
      <p>Si ya tienes una cuenta en LABURO <br />ve a <Link to='/login'>Login</Link></p>
      
    </div>
  );
}

export default Signup;
