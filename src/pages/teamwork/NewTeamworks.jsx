import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard.jsx";
import {
  addNewTeamworkService,
  updateTeamworkService,
  getTeamworkDetailsService,
  removeMemberService,
} from "../../services/teamwork.services.js";
import { getAllUsersService } from "../../services/user.services.js";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";


function NewTeamworks() {
  const { id } = useParams();
  const [teamworkDetails, setTeamworkDetails] = useState({
    name: "",
    members: [],
  });
  const [editMode, setEditMode] = useState(id ? false : true);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //solo tenemos el teamworkDetail pero cuando tenemos id
    if (id) {
      teamworkDetail();
    }
    searchMembers();
  }, []);

  // función para ejecutar en input
  const handleChangeSearch = (e) => {
    const inputText = e.target.value.toLowerCase();
    // actualiza el estado del search
    setSearch(inputText);

    if (!inputText) {
      setFilteredMembers([]);
      return;
    }
    const id = localStorage.getItem("id"); //nos traemos del localstorage nuestro id

    const filtMember = members?.filter((eachmember) => {
      return (
        eachmember.name.toLowerCase().includes(inputText) &&
        eachmember.name &&
        !teamworkDetails.members.some((member) =>
          member?.name.toLowerCase().includes(inputText)
        ) &&
        eachmember._id !== id //no añadir el creador
      );
    });
    // pasa el valor del input a la función
    setFilteredMembers(filtMember);
  };

  //buscar miembros en la base de datos
  const searchMembers = async () => {
    const response = await getAllUsersService();

    setMembers(response);
  };

  //Añadir miembros al equipo
  const handleAddMember = (user) => {
    //copia del obeto y dentro de members clonamos los miembros que ya había y le añadimos el user

    setTeamworkDetails({
      ...teamworkDetails,
      members: [...teamworkDetails.members, user],
    });
    setFilteredMembers([]);
    setSearch("");
  };

  // Cambiar los inputs
  const handleChange = (e) => {
    const teamWorkDetailsCopy = { ...teamworkDetails };

    teamWorkDetailsCopy[e.target.name] = e.target.value;

    setTeamworkDetails(teamWorkDetailsCopy);
  };

  //aqui llamamos a teamwork por el id

  const teamworkDetail = async () => {
    try {
      const response = await getTeamworkDetailsService(id);
      setTeamworkDetails(response);
    } catch (error) {
      navigate("/error");
    }
  };

  //Función para el envío del formulario
  const handleSubmit = async (e) => {
    if (id) {
      await updateTeamworkService(id, teamworkDetails);
    } else {
      const response = await addNewTeamworkService(teamworkDetails);
      navigate(`/teamwork/${response._id}`);
    }
    setEditMode(!editMode);
    setFilteredMembers([]);
    setSearch("");
  };

  //Función para eliminar un miembro del equipo

  const handleDeleteMember = async (idUser) => {
    try {
      const filtMembers = teamworkDetails.members.filter(
        (member) => member._id !== idUser
      );
      await removeMemberService(id, idUser);
      setTeamworkDetails({ ...teamworkDetails, members: filtMembers });
    } catch (error) {
      navigate("/error");
    }
  };

  if (!members || !teamworkDetails) {
    return <h3><CircularProgress /></h3>;
  }

  const showButton = () => {
    return (
      id && (
        <CardActions>
          <Button size='small' onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancelar" : "Modificar"}
          </Button>
        </CardActions>
      )
    );
  };


  return (
    <div className="newteamworks-container">
      {editMode ? (
        <div>

        <div className="input-container">

        <div className="input">

          <label htmlFor='name'>Nombre Teamwork</label>
          <input
            type='text'
            name='name'
            value={teamworkDetails.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="input">

          <label htmlFor='members'> Miembros</label>
          <input
            placeholder='search member'
            type='text'
            name='search'
            value={search}
            onChange={handleChangeSearch}
          />
        </div>
        </div>

          {filteredMembers.map((eachmember, index) => {
            return (
              <React.Fragment key={index}>
                <li>{eachmember.name}</li>

                <Button variant="contained" color="success"
                  onClick={() => {
                    handleAddMember(eachmember);
                  }}>
                  Añadir miembro
                </Button>
              </React.Fragment>
            );
          })}

          <br />
          <h3>{teamworkDetails.name}</h3>
          {teamworkDetails.members?.map((eachMember) => {
            return (
              <React.Fragment key={eachMember._id}>
                <p>{eachMember.name}</p>
                <Button size="small" onClick={() => handleDeleteMember(eachMember._id)}>
                  Eliminar
                </Button>
                <br />
              </React.Fragment>
            );
          })}
          <br />
          {editMode && <Button variant="contained" color="success" onClick={handleSubmit}> Guardar </Button>}
        </div>
      ) : (
        <div className="team-card">
          <Card sx={{ minWidth: 275}}>
            <CardContent>
              <Typography variant='h5' component='div'>
                Equipo : {teamworkDetails.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                Miembros
              </Typography>
              {teamworkDetails.members?.map((eachMember) => {
                return <p key={eachMember._id}>{eachMember.name}</p>;
              })}
            </CardContent>

            <CardActions>{showButton()}</CardActions>
          </Card>

          <div className="dashboardteam-container">
            <Dashboard />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewTeamworks;
