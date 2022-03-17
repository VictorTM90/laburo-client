import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginService } from "../services/auth.services"




function Login(props) {

const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate()

const handleSubmit = async(e) => {

    e.preventDefault();

    const user = {email, password}

    try{
        // contactar con el server para logear al usuario
        const response = await loginService(user)  
        const { authToken } = response.data

        localStorage.setItem("authToken", authToken)
        props.setIsLoggedIn(true)
        navigate("/profile")

    }catch(err){
        if (err?.response?.status === 400){
            setErrorMessage(err.response.data.errorMessage)
        }else{
            navigate("/error")
        }
  }
}


  return (
    <div>
        <form onSubmit={handleSubmit}>
        
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
  )
}

export default Login;
