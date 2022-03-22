import React from 'react'
import { getAllTeamworkService } from '../../services/teamwork.services';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

function TeamworkList() {
  const [allTeamwork, setAllTeamwork]= useState()
  const navigate = useNavigate();

  useEffect(() => {
   getAllTeamworks()
 },[])

  const getAllTeamworks = async ()=>{
    try{
      const response = await getAllTeamworkService()
      setAllTeamwork(response)
      console.log(response)
    }catch(err){
      navigate("/error")

    }
  }

  if(!allTeamwork){
    return <h3>...Loading</h3>
  }

  return (
    <div>
        <h2>Estos son tus equipos</h2>
        <span>Para ver los detalles de cada uno solo tienes que hacer click sobre el nombre.</span>
        {allTeamwork.map((eachTeam)=>{
          return(
          <React.Fragment key={eachTeam._id}>
            <Link to={`/teamwork/${eachTeam._id}`}>{eachTeam.name}</Link>
          </React.Fragment>

          )
        })}
    
    </div>
  )
}

export default TeamworkList