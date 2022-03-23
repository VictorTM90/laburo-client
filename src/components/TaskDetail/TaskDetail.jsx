import { CircularProgress } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  addNewTasksService,
  updateTasksService,
} from "../../services/tasks.services";
import { getTeamworkByIdCreator } from "../../services/teamwork.services";
import styles from "./TaskDetail.module.css";

function TaskDetail({ task }) {
  const [taskDetails, setTaskDetails] = useState(
    task || {
      creator: "",
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      isUrgent: false,
      //taskType,
       teamwork: "",
       assigned: "",
      isDone: "",
    }
  );

  const location = useLocation();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(
    !location.pathname.includes("/profile") && !id
  );

  // estado que contiene todos los teams del usuario
  const [creatorTeam, setCreatorTeam] = useState([]);
  const [membersInTeamwork, setMembersInTeamwork] = useState(null);
  const navigate = useNavigate();

  //si la task cambia vuelve a pasarla a taskDetails
  useEffect(() => {
    if (task) {
      setTaskDetails(task);
    }

    //  getAllTeamworks()
    // searhbyCreator()
    getTeamworksByCreator();
  }, [task]); //en dependencias pasamos la task para que cada vez que cambiamos la props se actualiza en taskDetails

  // 1.llamar al server para todos los miembros del team en el que el usuario es creador
  const getTeamworksByCreator = async () => {
    try {
      const response = await getTeamworkByIdCreator();
      //2. Selecionar el nombre del equipo y guardarlo
      setCreatorTeam(response);
    } catch (err) {
      navigate("/error");
    }
  };

  // Map MAP
  //  const searchMembers = creatorTeam.map((eachTeam) =>{
  //     eachTeam.members.name => guardar en un estado

  //  actualizar el estado del SetTaskDetails [...TaskDetails, assigned: [...TaskDetails.assigned,   ]]

  //  })

  const handleChangeTeamwork = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });

    const teamworkMatch = creatorTeam.find((eachTeamwork) => {
      console.log(eachTeamwork._id, e.target.value)
      return eachTeamwork._id == e.target.value
    })
    console.log(teamworkMatch)
    setMembersInTeamwork(teamworkMatch.members);
  };

  const handleChange = (e) => {
    console.log(creatorTeam)
    //para acceder a un campo de un objeto dimámico siempre utilizar []
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTasksService(id, taskDetails);
      setEditMode(!editMode);
    } else {
      console.log(taskDetails)
      const response = await addNewTasksService(taskDetails);
      navigate(`/task/${response._id}`);
    }
  };

  //las funciones que no son de react (no modifican ningún estado) deberían de estar en un archivo de js
  const formatedDateInput = (date) => {
    const splitedDate = new Date(date).toISOString().split(":");

    //eliminar los segundos del formato de la fecha
    return `${splitedDate[0]}:${splitedDate[1]}`;
  };

  const formatedDateView = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat(navigator.language, options).format(
      new Date(date)
    );
  };

  if (!taskDetails) {
    return <CircularProgress />;
  }

  return (
    <div>
      {id && (
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancelar" : "Modificar"}
        </button>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Descripcion:</label>
          <input
            type="text"
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
          />

          <label htmlFor="start">Fecha inicio:</label>

          <input
            type="datetime-local"
            name="start"
            value={formatedDateInput(taskDetails.start)}
            onChange={handleChange}
          />

          <label htmlFor="end">Fecha límite:</label>

          <input
            type="datetime-local"
            name="end"
            value={formatedDateInput(taskDetails.end)}
            onChange={handleChange}
          />

          <label htmlFor="teamwork">Equipo:</label>
            <select name="teamwork" onChange={handleChangeTeamwork}>
             {!membersInTeamwork && <option> your teamwork </option>}
              
              {creatorTeam.map((eachTeam) => {
                return (
                  <option key={eachTeam._id} value={eachTeam._id}>
                    {eachTeam.name}
                  </option>
                );
              })}
            </select>
        
          

          <label htmlFor="teamwork">  Asignado a :  </label>
           
            <select name="assigned" onChange={handleChange} disabled={membersInTeamwork ? false : true} >

            {membersInTeamwork && membersInTeamwork.map((eachMember) => {
                      return (
                        <option key={eachMember._id} value={eachMember._id}>
                          {eachMember.name}
                        </option>
                      );
                    })}



            </select>
       

          {/* <label htmlFor='assigned'>Tipo de tarea:
          <select name="assigned" onChange={handleChange}>
              <option value='Personal'>Personal</option>
              <option value='Teamwork'>Teamwork</option>
            </select>
          </label> */}

          <label htmlFor="isDone">
            Estado:
            <select name="isDone" onChange={handleChange}>
              <option value="To do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done!</option>
            </select>
          </label>

          {editMode && <button type="submit"> Guardar</button>}
        </form>
      ) : (
        <>
          <h3>{taskDetails.title}</h3>
          <p>{formatedDateView(taskDetails.start)}</p>
          <p>{formatedDateView(taskDetails.end)}</p>
          <p>{taskDetails.description}</p>
          <p>{taskDetails.isDone}</p>

          <p>{taskDetails.teamwork}</p>
        </>
      )}
    </div>
  );
}

export default TaskDetail;
