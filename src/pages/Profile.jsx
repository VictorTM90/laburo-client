import React from 'react'
import Dashboard from '../components/Dashboard'
import DashboardPrueba from '../components/DashboardPrueba'



function Profile() {

  


  return (
    <div>
    <h1>Perfil del usuario</h1>
    <div className="calendar">
    <Dashboard /> 
    {/* <DashboardPrueba /> */}
    </div>
    
    </div>
  )
}

export default Profile