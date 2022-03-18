import React from 'react'
import { Link } from "react-router-dom";






function Home() {
  return (
    <div>
        <h1>LABURO</h1>
   
        <Link to="/signup">Signup </Link>
        <Link to="/login">Login</Link>

        <Link to="/logout">logOut</Link>
       <br/>
        <Link to="/profile">Profile</Link>
       <br/>

        <Link to="/task/:id">Task</Link>
        <Link to="/task/new">New Task</Link>
       <br/>

        <Link to="/teamwork">Teamwork</Link>
        <Link to="/teamwork/:id">Your teamwork</Link>
        <Link to="/teamwork/:id/edit">Editar teamwork</Link>

        <Link to="/teamwork/new">New teamwork</Link>
        <Link to="/teamwork/task">Teamwork task</Link>
       

    </div>
  )
}

export default Home