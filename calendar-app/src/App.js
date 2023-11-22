import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateEvents, setDateEvents] = useState({}); // Object to store events

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleNewEvent = () => {
    const eventTitle = prompt('Enter Event Title');
    if (eventTitle) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const events = dateEvents[formattedDate] || [];
      setDateEvents({
        ...dateEvents,
        [formattedDate]: [...events, { title: eventTitle }]
      });
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formattedSelectedDate = formatDate(selectedDate);
  const events = dateEvents[selectedDate.toISOString().split('T')[0]] || [];

  return (
    <div className="App">
      <header className="App-header">
        <p>This is my Calendar</p>
        <h1>Calendar</h1>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <div className="events-container">
            <button onClick={handleNewEvent} className="new-event-button">
              New Event
            </button>
            <h2>Events on {formattedSelectedDate}</h2>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index}>{event.title}</div>
              ))
            ) : (
              <p>No events</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
