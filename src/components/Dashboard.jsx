import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import { Calendar } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link } from "react-router-dom";

function Dashboard() {
  const event = [{ title: "Dia del Padre", date: "2022-03-19" }];

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
        selectMirror={true}
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
