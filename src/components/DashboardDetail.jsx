import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { deleteTasksService } from "../services/tasks.services";
import TaskDetail from "./TaskDetail/TaskDetail";

function DashboardDetail({ task, deleteTask }) {

  const handleRemove = async () => {
    await deleteTasksService(task._id);
    deleteTask(task._id);
  };

  return task ? (
    <div className='listaTareasContainer'>
      <Link to={`/task/${task._id}`} className='task-link'>
        <TaskDetail task={task}/>
      </Link>
      <div>
        <Button variant="outlined" color="error" onClick={handleRemove}>Eliminar</Button>
      </div>
    </div>
  ) : null;
}

export default DashboardDetail;
