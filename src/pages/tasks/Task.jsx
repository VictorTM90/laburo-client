import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TaskDetail from "../../components/TaskDetail/TaskDetail";
import { getTasksDetailsService } from "../../services/tasks.services";
import { CircularProgress } from "@mui/material"
function Task() {
  //1. crear los estados que manejan la información del evento
  const [taskDetails, setTaskDetails] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  //2. fetching es el estado que revisa si el componente recibe la info
  const [fetching, setFetching] = useState(true);

  //4. useEffect que llamará al componentDidMount
  useEffect(() =>{
    getTaskDetails()
  },[])

  //5. función que llama a la Api 
  const getTaskDetails = async () =>{

    try{
      const response = await getTasksDetailsService(id)
      setTaskDetails(response)
      setFetching(false); //se renderiza la informacion

    }catch(err){
      navigate("/error")
    }

  }

  if (fetching) {
    return <h2><CircularProgress />;</h2>;
  }

  return (
    <div>
      <TaskDetail task={taskDetails} />
    </div>
  );
}

export default Task;
