import "./App.css";
//*HOOKS Y PAQUETES
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyService } from "./services/auth.services";

//*PAGES
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Task from "./pages/tasks/Task.jsx";



import NewTeamworks from "./pages/teamwork/NewTeamworks.jsx";
import TeamworkList from "./pages/teamwork/TeamworkList";

//*COMPONENTES
import NavbarMUI from "./components/NavbarMUI";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import Logout from "./pages/Logout";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    //propiedades del localStorage getItem// setItem y removeItem
    if (token) {
      verifyService();
    }
    //conexion servidor y validar
  }, []);

 

  return (
    <div className='App'>
      
      <NavbarMUI />
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/task/new' element={<TaskDetail />} />
        <Route path='/task/:id' element={<Task />} />

        <Route path='/teamwork/new' element={<NewTeamworks />} />
        <Route path='/teamwork/:id' element={<NewTeamworks />} />
        <Route path='/teamwork/:id/edit' element={<NewTeamworks />} />

        <Route path='/teamwork' element={<TeamworkList />} />

        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
