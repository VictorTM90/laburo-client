import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addNewTeamworkService,
  updateTeamworkService,
  deleteTeamworkService,
} from "../../services/teamwork.services.js";
import { getAllUsersService } from "../../services/user.services.js";

function NewTeamworks({ teamwork, deleteTeamwork }) {
  // traer usuarios
  const { id } = useParams();
  const navigate = useNavigate();

  // estado del teamWork
  const [teamworkDetails, setTeamworkDetails] = useState(
    teamwork || {
      name: "",
      creator: "",
      members: [],
    }
  );
  console.log(teamwork)
  // edit mode
  const [editMode, setEditMode] = useState(!id);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [addmembers, setAddmembers] = useState([]);

  useEffect(() => {
    searchMembers();
  }, []);

  // viene la función para ejecutar el search
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

  const searchMembers = async () => {
    const response = await getAllUsersService();

    setMembers(response);
  };

  const handleAddMember = (user) => {
    console.log(user, "miembro");

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

  const handleSubmit = async (e) => {
    if (id) {
      await updateTeamworkService(id, teamworkDetails);
    } else {
      //MAP de id de members

      const response = await addNewTeamworkService(teamworkDetails);
      navigate(`/teamwork/${response._id}`);
    }
    setEditMode(!editMode);
  };

  
  //eliminar teamwork
  const handleRemove = async () => {
    await deleteTeamworkService(teamwork._id);
    console.log(teamwork._id);
    deleteTeamwork(teamwork._id);
  };

  if (!members) {
    return <h3>...Loadding</h3>;
  }

  // const showButton = () => {
  //   return (
  //     id && (
  //       <button onClick={() => setEditMode(!editMode)}>
  //         {editMode ? "Cancelar" : "Modificar"}
  //       </button>
  //     )
  //   );
  // };

  return (
    <div>
      {/* {showButton()} */}
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

          {filteredMembers.map((eachmember) => {
            return (
              <React.Fragment key={eachmember._id}>
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
          {teamworkDetails.members.map((eachMember) => {
            return <p>{eachMember.name}</p>;
          })}
          <br />
          {editMode && <button onClick={handleSubmit}> Guardar </button>}
        </div>
      ) : (
        <>
          <h3>Equipo : {teamworkDetails.name}</h3>
          <h3>Miembros</h3>
          {teamworkDetails.members.map((eachMember) => {
            return (
              <>
                <p>{eachMember.name}</p>
              </>
            );
          })}
          <div>
            <button onClick={handleRemove}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default NewTeamworks;
