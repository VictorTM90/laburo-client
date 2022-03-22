import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  addNewTasksService,
  updateTasksService,
} from "../../services/tasks.services";
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
      // assigned,
      // teamwork,
      isDone: "",
    }
  );

  const location = useLocation();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(
    !location.pathname.includes("/profile") && !id
  );
  const navigate = useNavigate();

  //si la task cambia vuelve a pasarla a taskDetails
  useEffect(() => {
    if (task) {
      setTaskDetails(task);
    }
  }, [task]); //en dependencias pasamos la task para que cada vez que cambiamos la props se actualiza en taskDetails

  const handleChange = (e) => {
    //para acceder a un campo de un objeto dimámico siempre utilizar []
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTasksService(id, taskDetails);
      setEditMode(!editMode);
    } else {
      const response = await addNewTasksService(taskDetails);
      navigate(`/task/${response._id}`);
    }
    
  };

  //las funciones que no son de react (no modifican ningún estado) deberían de estar en un archivo de js
  const formatedDateInput = (date) => {
    const splitedDate = new Date(date).toISOString().split(":");
    console.log(splitedDate);
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
    return <h3>...LOADING</h3>;
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
          <label htmlFor='title'>Título:</label>
          <input
            type='text'
            name='title'
            value={taskDetails.title}
            onChange={handleChange}
          />
          <label htmlFor='description'>Descripcion:</label>
          <input
            type='text'
            name='description'
            value={taskDetails.description}
            onChange={handleChange}
          />

          <label htmlFor='start'>Fecha inicio:</label>

          <input
            type='datetime-local'
            name='start'
            value={formatedDateInput(taskDetails.start)}
            onChange={handleChange}
          />

          <label htmlFor='end'>Fecha límite:</label>

          <input
            type='datetime-local'
            name='end'
            value={formatedDateInput(taskDetails.end)}
            onChange={handleChange}
          />

          {/* <label htmlFor='taskType'>Tipo de tarea:
          <select name="taskType" onChange={handleChange}>
              <option value='Personal'>Personal</option>
              <option value='Teamwork'>Teamwork</option>
            </select>
          </label> */}

          <label htmlFor='isDone'>
          Estado:
          <select name="isDone" onChange={handleChange}>
            <option value='To do'>To Do</option>
            <option value='Doing'>Doing</option>
            <option value='Done'>Done!</option>
          </select>
        </label>

          {editMode && <button type='submit'> Guardar</button>}
        </form>
      ) : (
        <>
          <h3>{taskDetails.title}</h3>
          <p>{formatedDateView(taskDetails.start)}</p>
          <p>{formatedDateView(taskDetails.end)}</p>
          <p>{taskDetails.description}</p>
          <p>{taskDetails.isDone}</p>
          <p>{taskDetails.taskType}</p>
        </>
      )}
    </div>
  );
}

export default TaskDetail;
