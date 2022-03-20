import React from "react";
import { useState} from "react"



function TaskDetail({ task }) {

  const [taskDetails, setTaskDetails] = useState(task);
  const [editMode, setEditMode] = useState(false)
  console.log(taskDetails)

  return (
    <div>
      <h3>{task.title}</h3>
      <button
      onClick={()=> setEditMode(!editMode)}
      >Modificar
      </button>

      <p>{task.start}</p>
      <p>{task.end}</p>
      <p>{task.description}</p>
      hola que tal



    </div>
  );
}

export default TaskDetail;
