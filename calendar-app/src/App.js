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

  const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
  const events = dateEvents[formattedSelectedDate] || [];

  return (
    <div className="App">
      <header className="App-header">
        <p>This is my Calendar</p>
        <h1>Calendar</h1>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <button onClick={handleNewEvent}>New Event</button>
        <div>
          <h2>Events on {formattedSelectedDate}</h2>
          {events.map((event, index) => (
            <div key={index}>{event.title}</div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
