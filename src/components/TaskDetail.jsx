import React from "react";
import { useState} from "react"



function TaskDetail({ task }) {

  const [taskDetails, setTaskDetails] = useState(task);
  const [editMode, setEditMode] = useState(false)
  console.log(taskDetails)

  return (
    <div>
      <h3>{taskDetails.title}</h3>
      <button
      onClick={()=> setEditMode(!editMode)}
      >Modificar
      </button>

      <p>{taskDetails.start}</p>
      <p>{taskDetails.end}</p>
      <p>{taskDetails.description}</p>
      hola que tal



    </div>
  );
}

export default TaskDetail;
