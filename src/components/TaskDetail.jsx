import React from "react";
import { useState} from "react"



function TaskDetail({ task }) {

  const [taskDetails, setTaskDetails] = useState(task);
  const [editMode, setEditMode] = useState(false)


  return (
    <div>
      <h3>{taskDetails.title}</h3>
      <button
      onClick={()=> setEditMode(!editMode)}
      >Modificar
      </button>

      <p>{taskDetails.start.toString()}</p>
      <p>{taskDetails.end.toString()}</p>
      <p>{taskDetails.description}</p>
      hola que tal


      
    </div>
  );
}

export default TaskDetail;
