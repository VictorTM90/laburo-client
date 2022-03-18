
import './App.css';
//*HOOKS Y PAQUETES
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { verifyService } from './services/auth.services';

//*PAGES
import Error from './pages/Error';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile  from './pages/Profile';
import Task from './pages/tasks/Task.jsx'
import NewTask from './pages/tasks/NewTask.jsx'

import Teamwork from './pages/teamwork/Teamwork';
import NewTeamwork from './pages/teamwork/NewTeamworks.jsx';
import TeamworkList from './pages/teamwork/TeamworkList';


//*COMPONENTES 
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DashboardTeam from './components/DashboardTeam';

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

    {/* <Navbar isLoggedIn ={isLoggedIn}/> */}


    <Routes>
    <Route path="/" element= { <Home /> } />
      
      <Route path="/login" element={ <Login setIsLoggedIn={setIsLoggedIn}/>}  />
      <Route path="/signup" element={ <Signup />} />
      <Route path="/logout" element={ <Home />} />
      
      <Route path="/profile" element={ <Profile /> } />
      
      <Route path="/task/:id" element={ <Task /> } />
      <Route path="/task/new" element={ <NewTask /> } />


      <Route path="/teamwork/new" element={ <NewTeamwork /> } />
      <Route path="/teamwork/:id" element={ <Teamwork /> } />
      <Route path="/teamwork/:id/edit" element={ <Teamwork /> } />
      
      <Route path="/teamwork" element={ <TeamworkList /> } />



      <Route path="/teamwork/task" element={ <DashboardTeam /> } />

      <Route path="/error" element={ <Error /> } />
    </Routes>
      
    </div>
  );
}

export default App;
