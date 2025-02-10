import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import MiniCalendar from '../components/calendar/MiniCalendar';
import DaySchedule from '../components/calendar/DaySchedule';
import CategorySelector from '../components/calendar/CategorySelector';
import '../styles/Calendar.css';

function MonthCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showCustomDaySchedule, setShowCustomDaySchedule] = useState(false);
  const [calendarRef, setCalendarRef] = useState(null);

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a new title for your event');
    if (title) {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleMiniCalendarDateClick = (dateInfo) => {
    setSelectedDate(dateInfo.date);
    setShowCustomDaySchedule(true);
  };

  const handleCategoryChange = (categoryId, checked) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(categoryId);
      } else {
        newSet.delete(categoryId);
      }
      return newSet;
    });
  };

  const handleCalendarViewChange = () => {
    setShowCustomDaySchedule(false);
  };

  const renderCalendarView = () => {
    if (showCustomDaySchedule && selectedDate) {
      return (
        <div>
          <div className="calendar-header">
            <button onClick={() => setShowCustomDaySchedule(false)}>Back to Calendar</button>
          </div>
          <DaySchedule date={selectedDate} />
        </div>
      );
    }

    return (
      <FullCalendar
        ref={setCalendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        viewDidMount={handleCalendarViewChange}
        initialEvents={[
          { title: 'Sample Event', start: '2024-12-15' }
        ]}
        slotMinTime="05:00:00"
        slotMaxTime="29:00:00"
        allDaySlot={false}
        slotDuration="01:00:00"
        scrollTime="07:00:00"
      />
    );
  };

  return (
    <div className="calendar-layout">
      <div className="calendar-left-panel">
        <MiniCalendar onDateClick={handleMiniCalendarDateClick} />
        <CategorySelector onCategoryChange={handleCategoryChange} />
      </div>
      <div className="main-calendar-area">
        {renderCalendarView()}
      </div>
    </div>
  );
}

export default MonthCalendar;
