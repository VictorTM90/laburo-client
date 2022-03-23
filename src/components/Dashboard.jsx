import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAllTasksService,
  getAllTeamworkTasksService,
  updateTasksService,
} from "../services/tasks.services";

import DashboardDetail from "./DashboardDetail";
import Modal from "./Modal";
import { CircularProgress } from "@mui/material";

function Dashboard() {
  //1. crear el estado que maneja  la información
  const [allTasks, setAllTasks] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [open, setOpen] = useState(false);
  const {id} = useParams(); 
  const navigate = useNavigate();

  //2. el useEffect llama al componen que se está montando
  useEffect(() => {
    getAllTasks();
  }, []);

  //3. funcion que llama la info de la Api y actualiza el estado
  const getAllTasks = async () => {
    try {
      // si no id del teamwork
      
     if(!id){
        const response = await getAllTasksService();
      setAllTasks(response);
      } else {
       // si tengo id del teamwork 
        const responseTask = await getAllTeamworkTasksService(id)
        
        setAllTasks(responseTask);
        //hacer la llamda de las tareas del teamwork 
      }



    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  //4. sistema de loading
  if (!allTasks) {
    return <CircularProgress />
  }

  const handleDayChange = async (e) => {
    const { _id } = e.event._def.extendedProps;
    const { start, end } = e.event._instance.range;
    // console.log(e.event._instance.range);
    //aquí esta guardando la task original que estoy moviendo /modificando
    const editedTask = allTasks.find((eachTask) => eachTask._id === _id);
    // con el spread hacemos un clone de la task editada y solo quiero modificar las fechas end y start ( que son los parametros nuevos )
    const editedTaskCopy = { ...editedTask, end, start };
    // llamamos al endpoint para modificarlo
    await updateTasksService(_id, editedTaskCopy);
    // crear una variable nueva con el allTask modificado
    const allTaskEdited = allTasks.map((eachTask) => {
      if (eachTask._id === _id) {
        return editedTaskCopy;
      }
      return eachTask;
    });
    //Actualizar el estado de las tareas
    setAllTasks(allTaskEdited);

    if (_id === selectedTask?._id) {
      setSelectedTask(editedTaskCopy);
     
    }
  };

  const handleShowTask = (e) => {
    //accedemos al id de la task
    const { _id } = e.event._def.extendedProps;
    //filtrar por todas las task la task a la que se ha hecho click
    const taskClicked = allTasks.find((eachTask) => eachTask._id === _id);
    //guardar en el estado la task clicada
    setSelectedTask(taskClicked);
    setOpen(true)
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = allTasks.filter((task) => task._id !== id);
    setAllTasks(filteredTasks);
    setSelectedTask();
    handleCloseModal()
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>El Dashboard</h2>

      <Link to={"/task/new"}>
        <button>Add Task</button>
      </Link>
      <Link to={"/teamwork/new"}>
        <button>Add Teamwork</button>
      </Link>
      <Link to={"/teamwork/"}>
        <button>Your Teamworks</button>
      </Link>

      <div className='dashboardContainer'>
        <div className='fullCalendarContainer'>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            editable
            initialView='timeGridWeek'
            weekends
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            timeZone='UTC'
            slotMinTime='07:00:00'
            slotMaxTime='21:00:00'
            height={700}
            selectable
            dayMaxEvents
            events={allTasks}
            eventChange={handleDayChange}
            eventClick={handleShowTask}
            eventColor='orange'
            // eventBorderColor="red"
            all-day= "false"
           
          />
        </div>
        {/* {selectedTask && (
          <DashboardDetail task={selectedTask} deleteTask={handleDeleteTask} />
        )} */}
        <Modal open={open} handleClose={handleCloseModal}>
          <DashboardDetail task={selectedTask} deleteTask={handleDeleteTask} />
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;
