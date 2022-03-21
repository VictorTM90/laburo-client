import React from 'react'
import Dashboard from '../components/Dashboard'
import DasboardTeam from '../components/DashboardTeam'


function Profile() {

  


  return (
    <div>
    <h1>Perfil del usuario</h1>
     <DasboardTeam />
    <div className="calendar">
    <Dashboard /> 
    </div>
    
    </div>
  )
}

export default Profile