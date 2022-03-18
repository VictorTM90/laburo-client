import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";

import { Link } from "react-router-dom";
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
             await signupService(user)
            navigate("/login")
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
        console.log(errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
       <Link to="/">Home</Link>
       <Link to="/login">Login</Link>
      <h3>SignUp</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>

      <p>{errorMessage}</p>
    </div>
  );
}

export default Signup;
