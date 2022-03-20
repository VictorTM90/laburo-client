import React from "react";
import {  useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import { updateTasksService } from "../services/tasks.services";


function TaskDetail({ task }) {

  const [taskDetails, setTaskDetails] = useState(task);
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState (taskDetails.title)
 
  const {id} = useParams(); 
  
  console.log(taskDetails)

  const navigate = useNavigate();

  
 
  const handleChangeTitle = async (e) =>{
    e.preventDefault();
   console.log(taskDetails)
   console.log(newTitle)
   
   
  // setTaskDetails({...taskDetails,  [e.target.title]:e.target.value })
  // setTaskDetails({title:newTitle})
   const updateTask = {
     
    title:newTitle
  
  }
   try{
     const response = await updateTasksService (id, updateTask)
     console.log( "RESPONSE.TITLE", response)
    }catch(err){
      navigate("/error")
    }

   console.log("MODIFICADO", taskDetails) 
   setEditMode(!editMode)
    //console.log()
  }

  if (!taskDetails){
    return <h3>...LOADING</h3>
  }

  return (
    <div>
     
      <button
      onClick={()=> setEditMode(!editMode)}
      >Modificar
      </button>

     { editMode  ? 
     
     <form onSubmit={handleChangeTitle}>
     <label htmlFor='title'>Título:</label>
        <input
          type='text'
          name='title'
          value={newTitle} 
          onChange={(e)=> setNewTitle (e.target.value)}
        />
        <button>Guardar cambios</button>
        </form>
       : <h3>{newTitle}</h3>}

      <p>{task.start}</p>
      <p>{task.end}</p>
      <p>{task.description}</p>
      hola que tal



    </div>
  );
}

export default TaskDetail;
