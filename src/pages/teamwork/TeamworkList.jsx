import React from "react";
import { deleteTeamworkService, getAllTeamworkService } from "../../services/teamwork.services";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

function TeamworkList() {
  const [allTeamwork, setAllTeamwork] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTeamworks();
  }, []);

  const getAllTeamworks = async () => {
    try {
      const response = await getAllTeamworkService();
      setAllTeamwork(response);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleDeleteTeamwork = async(id) => {
   const filtTeamworks = allTeamwork.filter((team) => team._id !== id)
   await deleteTeamworkService(id);
   setAllTeamwork(filtTeamworks);
   };

  if (!allTeamwork) {
    return <h3><CircularProgress />;</h3>;
  }

  return (
    <div>
      <h2>Estos son tus equipos</h2>
      <span>
        Para ver los detalles de cada uno solo tienes que hacer click sobre el
        nombre.
      </span>

      {allTeamwork.map((eachTeam) => {
        return (
          <div key={eachTeam._id}>
            <Link to={`/teamwork/${eachTeam._id}`}>
              <p>{eachTeam.name}</p>
              {eachTeam.members.map((members) => {
                return <li key={members._id}>{members.name}</li>;
              })}
            </Link>
            <button onClick={() =>handleDeleteTeamwork(eachTeam._id)}>Eliminar</button>
          </div>
        );
      })}
    </div>
  );
}

export default TeamworkList;
