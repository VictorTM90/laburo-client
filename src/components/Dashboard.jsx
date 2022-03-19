import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import { Calendar } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { getAllTasksService } from '../services/tasks.services';

function Dashboard() {

  //1. crear el estado que maneja  la información 
  const [ allTasks, setAllTasks ] = useState(null)
  const [ calendar, setCalendar ] = useState(null)
  const navigate = useNavigate()

  //2. el useEffect llama al componen que se está montando
  useEffect(() =>{
    getAllTasks()
  }, [])
  //3. funcion que llama la info de la Api y actualiza el estado
  const getAllTasks = async() =>{

    try{
      const response = await getAllTasksService()
      setAllTasks(response.data)
      setCalendar(response.data)
      // calendar.getEvents(response.data)
      console.log(response.data)
    }catch(err){
      if(err.response.status === 401){
        navigate("/login")
      }else{
        navigate("/error")
      }
    }
  }

  //4. sistema de loading
  if(!allTasks){
    return <h3>...Loading</h3>
  }
  // const event = [{ title: "Dia del Padre", date: "2022-03-19" }];
  const event = ()=>{
     allTasks.map((eachTask)=>{
       return(
         [{title: eachTask.title , date: eachTask.date}]
       )
     })
   }

  return (
    <div>
      <h2>El Dashboard</h2>

      <Link to={"/task/new"}>
        <button>Add Task</button>
      </Link>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        editable={true}
        // initialView="dayGridWeek"
        initialView='timeGridWeek'
        weekends={true}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale='sp'
        slotMinTime='07:00:00'
        slotMaxTime='21:00:00'
        height={700}
        selectable={true}
        // selectMirror={true}
        dayMaxEvents={true}
        events={
         event

          
        // { title: 'Dia del Padre', date: '2022-03-19' },
        // { title: 'tarde de proyecto', date: '2022-03-18' }
        }
      />
    </div>
  );
}

export default Dashboard;
