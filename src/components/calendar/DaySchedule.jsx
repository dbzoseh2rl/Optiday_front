import React from 'react';
import './DaySchedule.css';

function DaySchedule({ date }) {
  // Sample schedule data (you can replace this with real data later)
  const sampleSchedule = [
    { time: '07:00', event: 'Morning Exercise' },
    { time: '09:00', event: 'Team Meeting' },
    { time: '12:30', event: 'Lunch with Client' },
    { time: '15:00', event: 'Project Review' },
    { time: '18:00', event: 'Evening Study' }
  ];

  // Generate time slots from 5 AM to 5 AM next day
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 5) % 24;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="day-schedule">
      <h2>{date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</h2>
      <div className="schedule-grid">
        <div className="time-column">
          {timeSlots.map((time, index) => (
            <div key={index} className="time-slot">
              {time}
            </div>
          ))}
        </div>
        <div className="event-column">
          {timeSlots.map((time, index) => {
            const event = sampleSchedule.find(e => e.time === time);
            return (
              <div key={index} className="event-slot">
                {event && <div className="event-item">{event.event}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DaySchedule;
