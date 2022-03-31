import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation} from "react-router-dom";
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
import { CircularProgress, ThemeProvider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { ThemeContext } from "../../context/theme.context";

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
  const { theme } = useContext(ThemeContext);
  const location = useLocation()
  
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
    
    if (location.pathname.includes("/teamwork/new")){
     
      const filtMembers = teamworkDetails.members.filter(
        (member) => member._id !== idUser
      );
      setTeamworkDetails({ ...teamworkDetails, members: filtMembers });

    } else {
    
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
    return (
      <h3>
        <CircularProgress />
      </h3>
    );}



  }

  const showButton = () => {
    return (
      id && (
        <ThemeProvider theme={theme}>
          <CardActions >
            <Button
              color="primary"
              size="small"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancelar" : "Modificar"}
            </Button>
          </CardActions>
        </ThemeProvider>
      )
    );
  };

  return (
    <div className="newteamworks-container">
      {editMode ? (
        <div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="name">Nombre Teamwork</label>
              <input
                type="text"
                name="name"
                value={teamworkDetails.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <label htmlFor="members"> Miembros</label>
              <input
                placeholder="search member"
                type="text"
                name="search"
                value={search}
                onChange={handleChangeSearch}
              />
            </div>
          </div>

          {filteredMembers.map((eachmember, index) => {
            return (
               <div key={index} className= "members-teamwork-container">
                <li className="añadir-miembro">{eachmember.name}</li>

                <ThemeProvider theme={theme}>
                 
                  <Button
                    variant="text"
                    color="btn"
                    size="small"
                    onClick={() => {
                      handleAddMember(eachmember);
                    }}
                  >
                  <br/>
                   <div >Añadir miembro</div> 
                  </Button>
                </ThemeProvider>
              </div>
            );
          })}

          <br />
          <h3>{teamworkDetails.name}</h3>
          {teamworkDetails.members?.map((eachMember) => {
            return (
              <ThemeProvider theme={theme}>
                <div key={eachMember._id} className= "members-teamwork-container">
                  <p className="añadir-miembro">{eachMember.name}</p>
                  <Button
                    size="small"
                    variant="text"
                    margin ="normal"
                    color="btn"
                    onClick={() => handleDeleteMember(eachMember._id)}
                  >
                    Eliminar
                  </Button>
                  <br />
                </div>
              </ThemeProvider>
            );
          })}
          <br />
          {editMode && (
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
               
                Guardar
              </Button>
            </ThemeProvider>
          )}
        </div>
      ) : (
        <div className="team-card">
          <ThemeProvider theme={theme}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Equipo : {teamworkDetails.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Miembros
                </Typography>
                {teamworkDetails.members?.map((eachMember) => {
                  return <p key={eachMember._id}>{eachMember.name}</p>;
                })}
              </CardContent>

              <CardActions>{showButton()}</CardActions>
            </Card>
          </ThemeProvider>

          <div className="dashboardteam-container">
            <Dashboard />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewTeamworks;
