import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewTasksService } from "../../services/tasks.services";

function NewTask() {
  //1. crear los estados que manejan la información del evento
  const [creator, setCreator] = useState("");
  const [start, setStart] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [end, setEnd] = useState(new Date());
  const [assigned, setAssigned] = useState("");
  const [taskType, setTaskType] = useState("Personal");
  const [teamwork, setTeamwork] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isDone, setIsDone] = useState("To do");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    // prevenir el comportamiento del form del event
    event.preventDefault();
    //elemento que está creando el usuario
    const newTask = {
      start, 
      title,
      description,
      end,
      // assigned,
      // taskType,
      // teamwork,
      isUrgent,
      isDone,
    };
    try {
      await addNewTasksService(newTask);
      //redireccionar el usuario
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Añadir tarea</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Título:</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <label htmlFor='start'>Fecha inicio:</label>
        <input
          type='datetime-local'
          name='start'
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor='end'>Fecha fin:</label>
        <input
          type='datetime-local'
          name='end'
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <br />
        <label htmlFor='description'>Descripcion:</label>
        <textarea
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>
        <br />

        <label htmlFor='taskType'>
          Tipo de tarea:
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}>
            <option value='Personal'>Personal</option>
            <option value='Teamwork'>Teamwork</option>
          </select>
        </label>

        <br />

        <label htmlFor='teamwork'>Teamwork:</label>
        <input
          type='text'
          name='teamwork'
          value={teamwork}
          onChange={(e) => setTeamwork(e.target.value)}
        />

        <br />
        <label htmlFor='assigned'>Asignado a:</label>
        <input
          type='text'
          name='assigned'
          value={assigned}
          onChange={(e) => setAssigned(e.target.value)}
        />
        <br />

        <label htmlFor='isUrgent'>Urgente:</label>
        <input
          type='checkbox'
          name='isUrgent'
          value={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
        />
        <br />

        <label htmlFor='isDone'>
          Estado:
          <select value={isDone} onChange={(e) => setIsDone(e.target.value)}>
            <option value='To do'>To Do</option>
            <option value='Doing'>Doing</option>
            <option value='Done'>Done!</option>
          </select>
        </label>

        <br />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTask;
