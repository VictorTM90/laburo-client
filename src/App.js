
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Error from './pages/Error';
import { useState, useEffect } from 'react';
import { verifyService } from './services/auth.services';
import Profile  from './pages/Profile';




function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
    //conexion servidor y validar
    verifyUser()
  }, [])

  const verifyUser = async () => {
    try{
      await verifyService()
      //cambiar el estado a true
      setIsLoggedIn(true)

    }catch(err){
      setIsLoggedIn(false)
    }
  }



  return (
    <div className="App">
    <Routes>
    <Route path="/" element= { <Home /> } />
      <Route path="/login" element={ <Login setIsLoggedIn={setIsLoggedIn}/>}  />
      <Route path="/signup" element={ <Signup />} />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/error" element={ <Error /> } />
    </Routes>
      
    </div>
  );
}

export default App;
