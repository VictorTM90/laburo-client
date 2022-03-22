import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAllTasksService,
  updateTasksService,
} from "../services/tasks.services";
import DashboardDetail from "./DashboardDetail";

function DashboardTeam() {

  const [allTasks, setAllTasks] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [allTeamworks, setAllTeamworks] = useState();
  const [selectedTeamwork, setSelectedTeamwork] = useState ()
  const navigate = useNavigate();

  
  useEffect(() => {
    getAllTasks();
  }, []);

  //llamada a la Api y conseguir las tareas filtradas por el id del team
  const getAllTasks = async () => {
    try {
      const response = await getAllTasksService();
      //filtrarlo por el id del grupo id 

      
      setAllTasks(response);
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
    return <h3>...Loading</h3>;
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
      // console.log(editedTaskCopy);
    }

  };

  const handleShowTask = (e) => {
    //accedemos al id de la task
    const { _id } = e.event._def.extendedProps;
    //filtrar por todas las task la task a la que se ha hecho click
    const taskClicked = allTasks.find((eachTask) => eachTask._id === _id);
    //guardar en el estado la task clicada
    setSelectedTask(taskClicked);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = allTasks.filter((task) => task._id !== id);
    setAllTasks(filteredTasks);
    setSelectedTask();
  };

  return (
    <div>
      <h2>El Dashboard TEAM</h2>

      <Link to={"/task/new"}>
        <button>Add Task</button>
      </Link>
      <Link to={"/teamwork/new"}>
        <button>Add Teamwork</button>
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
            timeZone="UTC"
            slotMinTime='07:00:00'
            slotMaxTime='21:00:00'
            height={700}
            selectable
            dayMaxEvents
            events={allTasks}
            eventChange={handleDayChange}
            eventClick={handleShowTask}
            eventColor="purple"
            // eventBorderColor="red"
          />
        </div>
        {selectedTask && (
          <DashboardDetail task={selectedTask} deleteTask={handleDeleteTask} />
        )}
      </div>
    </div>
  );
}

export default DashboardTeam;