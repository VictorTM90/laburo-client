import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addNewTeamworkService,
  updateTeamworkService,
  getTeamworkDetailsService,
  removeMemberService,
} from "../../services/teamwork.services.js";
import { getAllUsersService } from "../../services/user.services.js";

function NewTeamworks() {
  
  const { id } = useParams();
  const [teamworkDetails, setTeamworkDetails] = useState(
      [] || {
      name: "",
      members: [],
    }
    );
    const [editMode, setEditMode] = useState(id ? false : true);
    const [search, setSearch] = useState("");
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [addmembers, setAddmembers] = useState([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {
      teamworkDetail()
      searchMembers();
    }, []);
    
    // función para ejecutar en input
    const handleChangeSearch = (e) => {
      // actualiza el estado del search
      setSearch(e.target.value);
      
      if (!e.target.value) {
        setFilteredMembers([]);
        return;
      }
      const filtMember = members.filter((eachmember) => {
        return eachmember.name.includes(e.target.value) && eachmember.name;
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
    setAddmembers([...addmembers, user]);

    const teamWorkDetailsCopy = { ...teamworkDetails };

    teamWorkDetailsCopy.members = [...addmembers, user];

    setTeamworkDetails(teamWorkDetailsCopy);
  };

  // Cambiar los inputs
  const handleChange = (e) => {
    const teamWorkDetailsCopy = { ...teamworkDetails };

    teamWorkDetailsCopy[e.target.name] = e.target.value;

    setTeamworkDetails(teamWorkDetailsCopy);
  };

  //aqui llamamos a teamwork por el id
  
  const teamworkDetail = async () =>{
    try {
      const response = await getTeamworkDetailsService(id);
      setTeamworkDetails(response)
      
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
  };

  //Función para eliminar un miembro del equipo
  console.log(teamworkDetails.members, "INFO TEAM")
  const handleDeleteMember = async(idUser) =>{
   console.log(idUser, "ID USER")
    try{
      const filtMembers = teamworkDetails.members.filter((member) => member._id !== idUser)
      await removeMemberService(id, idUser)
      setTeamworkDetails(filtMembers)

    }catch(error){
      navigate("/error");
    }
  }

  if (!members || !teamworkDetails) {
    return <h3>...Loadding</h3>;
  }

  const showButton = () => {
    return (
      id && (
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancelar" : "Modificar"}
        </button>
      )
    );
  };

  return (
    <div>
      {showButton()}

      {editMode ? (
        <div>
          <label htmlFor='name'>Nombre Teamwork</label>
          <input
            type='text'
            name='name'
            value={teamworkDetails.name}
            onChange={handleChange}
          />
          <label htmlFor='members'> Miembros</label>
          <input
            placeholder='search member'
            type='text'
            name='search'
            value={search}
            onChange={handleChangeSearch}
          />

          {filteredMembers.map((eachmember, index) => {
            return (
              <React.Fragment key={index}>
                <li>{eachmember.name}</li>

                <button
                  onClick={() => {
                    handleAddMember(eachmember);
                  }}>
                  Añadir miembro
                </button>
              </React.Fragment>
            );
          })}

          <br />
          <h3>{teamworkDetails.name}</h3>
          {teamworkDetails.members?.map((eachMember) => {
            return(
              <React.Fragment key={eachMember._id}>
              <p>{eachMember.name}</p>
              <button onClick={() =>handleDeleteMember(eachMember._id)}>Eliminar</button>
              <br />
              </React.Fragment>
            ) 
              
          })}
          <br />
          {editMode && <button onClick={handleSubmit}> Guardar </button>}
        </div>
      ) : (
        <>
          <h3>Equipo : {teamworkDetails.name}</h3>
          <h3>Miembros</h3>
          {teamworkDetails.members?.map((eachMember) => {
  
            return (
              <>
                <p>{eachMember.name}</p>
              </>
            );
          })}
          <div></div>
        </>
      )}
    </div>
  );
}

export default NewTeamworks;
