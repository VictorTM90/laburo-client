import React, {  useState, useEffect } from 'react'
import NewTeamworks from "../teamwork/NewTeamworks"
import { useNavigate,useParams } from "react-router-dom";
import { getAllTeamworkService } from '../../services/teamwork.services';


function Teamwork() {
  const [allTeamwork, setAllTeamwork]= useState()
  const navigate = useNavigate();
  const { id } = useParams();

 useEffect(() => {
   getAllTeamworks()
 },[])
  

  const getAllTeamworks = async ()=>{
    try{
      const response = await getAllTeamworkService()
      console.log(response)
      setAllTeamwork(response)
    }catch(err){
      navigate("/error")

    }
  }

  const handleDeleteTeamwork = (id) => {
    const filteredTeamwork = allTeamwork.filter((teamwork) => teamwork._id !== id)
    console.log(filteredTeamwork)
    setAllTeamwork(filteredTeamwork)
  }

  if(!allTeamwork){
    return <h3>...Loading</h3>
  }

  return (
    <div>
        <h3>Render a specific Teamwork </h3>
       
        <NewTeamworks teamwork={allTeamwork} deleteTeamwork={handleDeleteTeamwork}/> 
  
    </div>
  )
}

export default Teamwork