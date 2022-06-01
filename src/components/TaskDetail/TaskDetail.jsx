import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  addNewTasksService,
  updateTasksService,
} from "../../services/tasks.services";
import { getTeamworkByIdCreator } from "../../services/teamwork.services";
import styles from "./TaskDetail.module.css";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../../context/theme.context";

function TaskDetail({ task }) {
  const [taskDetails, setTaskDetails] = useState(
    task || {
      creator: localStorage.getItem("id"),
      title: "",
      start: new Date(),
      end: new Date(),
      description: "",
      isUrgent: false,
      teamwork: localStorage.getItem("id"),
      assigned: localStorage.getItem("id"),
      isDone: "",
    }
  );
  const { theme } = useContext(ThemeContext);

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

    getTeamworksByCreator();
  }, [task]); //en dependencias pasamos la task para que cada vez que cambiamos la props se actualiza en taskDetails

  useEffect(() => {
    if (creatorTeam && task?.teamwork) {
      const teamworkMembers = getTeamworkMembers(task.teamwork._id);

      setMembersInTeamwork(teamworkMembers);
    }
  }, [creatorTeam]);

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

  const getTeamworkMembers = (text) => {
    return creatorTeam.find((eachTeamwork) => {
      // eslint-disable-next-line eqeqeq
      return eachTeamwork._id == text;
    })?.members;
  };

  const handleChangeTeamwork = (e) => {
    const handleObject = { ...taskDetails, [e.target.name]: e.target.value };

    setMembersInTeamwork(getTeamworkMembers(e.target.value));

    if (!handleObject.assigned?._id) {
      handleObject.assigned = taskDetails.creator._id;
    }

    if (e.target.value === "-----------") {
      handleObject.teamwork = taskDetails.creator._id;
    }
    setTaskDetails(handleObject);
  };

  const handleChange = (e) => {
    if (e.target.name === "assigned" && e.target.value === "-----------") {
      e.target.value = localStorage.getItem("id");
    }
    //para acceder a un campo de un objeto dimámico siempre utilizar []
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const copyTaskDetails = { ...taskDetails };

    if (!copyTaskDetails.assigned) {
      copyTaskDetails.assigned = localStorage.getItem("id");
    }
    if (id) {
      const response = await updateTasksService(id, copyTaskDetails);
      setTaskDetails(response);
      setEditMode(!editMode);
    } else {
      const response = await addNewTasksService(copyTaskDetails);
      navigate(`/task/${response._id}`);
    }
  };

  //las funciones que no son de react (no modifican ningún estado) deberían de estar en un archivo de js
  const formatedDateInput = (date) => {
    const splitedDate = new Date(date).toISOString().split(":");
    console.log(splitedDate, "splited");

    //eliminar los segundos del formato de la fecha
    return `${splitedDate[0]}:${splitedDate[1]}`;
  };

  const formatedDateView = (date) => {
  // console.log(date,  "DATE")
  //   const options = {
  //     day: "numeric",
  //     year: "numeric",
  //     month: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: false,
  //   };

    let formatedDate = new Date(date).toISOString().split(":")
    let removeT = formatedDate[0].split("T")
    let reverseDay = removeT[0].split("-").reverse().join("-")
    
  
    console.log(removeT, "t")
    return `${reverseDay}  ${removeT[1]}:${formatedDate[1]}`
    //check the value
    // return new Intl.DateTimeFormat("en-ES", options).format(
    //   new Date(date)
    // );
  };

  if (!taskDetails) {
    return <CircularProgress />;
  }

  return (
    <div>
      
   

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor='title'>Título:</label>
            <input
              type='text'
              name='title'
              value={taskDetails.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='description'>Descripcion:</label>
            <input
              type='text'
              name='description'
              value={taskDetails.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='start'>Fecha inicio:</label>

            <input
              type='datetime-local'
              name='start'
              value={formatedDateInput(taskDetails.start)}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='end'>Fecha límite:</label>

            <input
              type='datetime-local'
              name='end'
              value={formatedDateInput(taskDetails.end)}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='teamwork'>Equipo:</label>
            <select name='teamwork' onChange={handleChangeTeamwork}>
              <option value={null}>-----------</option>

              {creatorTeam.map((eachTeam) => {
                return (
                  <option
                    selected={taskDetails.teamwork?._id === eachTeam._id}
                    key={eachTeam._id}
                    value={eachTeam._id}>
                    {eachTeam.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor='teamwork'> Asignado a : </label>

            <select
              name='assigned'
              onChange={handleChange}
              disabled={membersInTeamwork ? false : true}>
              <option value={null}>-----------</option>
              {membersInTeamwork &&
                membersInTeamwork.map((eachMember) => {
                  return (
                    <option
                      selected={taskDetails.assigned?._id === eachMember._id}
                      key={eachMember._id}
                      value={eachMember._id}>
                      {eachMember.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div>
            <label htmlFor='isDone'>Estado:</label>
            <select name='isDone' onChange={handleChange}>
              <option value='To do'>To Do</option>
              <option value='Doing'>Doing</option>
              <option value='Done'>Done!</option>
            </select>
          </div>

          <div>
            {editMode && (
              <ThemeProvider theme={theme}>
              <Button
                variant='outlined'
                color='btn'
                size='small'
                type='submit'>
                Guardar
              </Button>
              </ThemeProvider>
            )}
          </div>
        </form>
      ) : (
        <>
          <h3>{taskDetails.title}</h3>
          {taskDetails.creator && <p>Creador: {taskDetails.creator.name}</p>}
          <p>Empieza: {formatedDateView(taskDetails.start)}</p>
          <p>Acaba: {formatedDateView(taskDetails.end)}</p>
          <p>Descripción: {taskDetails.description}</p>
          {taskDetails.assigned?.name && (
            <p>Asignada: {taskDetails.assigned.name}</p>
          )}
          <p>{taskDetails.isDone}</p>

          {taskDetails.teamwork && <p>Team: {taskDetails.teamwork.name}</p>}

          {id && (
            <ThemeProvider theme={theme}>
        <Button variant="outlined" color="secondary" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancelar" : "Modificar"}
        </Button>
        </ThemeProvider>
      )}
        </>
      )}
    </div>
  );
}

export default TaskDetail;
