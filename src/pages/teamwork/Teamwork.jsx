import React, {  useState } from 'react'
import NewTeamworks from "../teamwork/NewTeamworks"
function Teamwork() {
  const [selectedTeamwork, setSelectedTeamwork] = useState ()

  // tenemos que llamar a la ruta get 


  return (
    <div>
        <h3>   Render a specific Teamwork </h3>
       
        <NewTeamworks selectedTeamwork={selectedTeamwork} /> 
     
  
    </div>
  )
}

export default Teamwork