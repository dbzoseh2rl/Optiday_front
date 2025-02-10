import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './MiniCalendar.css';

function MiniCalendar({ onDateClick }) {
  return (
    <div className="mini-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        height="auto"
        dateClick={onDateClick}
        dayMaxEvents={0}  // Hide the "+more" link
        displayEventTime={false}
      />
    </div>
  );
}

export default MiniCalendar;
