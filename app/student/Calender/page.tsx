<<<<<<< HEAD
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);

  function handleDateSelect(selectInfo) {
    const title = prompt("Event title:");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(newEvent);
      setEvents((prev) => [...prev, newEvent]);
    }
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Delete event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      setEvents((prev) => prev.filter((e) => e.id !== clickInfo.event.id));
    }
  }

  return (
    <div className="p-3">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
}
=======
import React from 'react'

const Calender = () => {
  return (
    <div>
      <h1>Calender page</h1>
    </div>
  )
}

export default Calender
>>>>>>> 2ba3b8fe8d16024817ed44cca7ca549c62421b81
