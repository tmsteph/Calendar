import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from './firebaseConfig'; // Import your Firebase configuration

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateEvents, setDateEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleNewEvent = () => {
    if (eventTitle.trim() === '') {
      alert('Event title cannot be empty.');
      return;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const newEvent = { title: eventTitle };

    // Update the event in Firebase Firestore
    db.collection('events')
      .doc(formattedDate)
      .set({ title: eventTitle })
      .then(() => {
        // Update the local state with the new event
        setDateEvents([...dateEvents, newEvent]);
        setEventTitle('');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  useEffect(() => {
    // Load events from Firebase Firestore when the component mounts
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const eventsRef = db.collection('events').doc(formattedDate);

    eventsRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDateEvents([doc.data()]);
        } else {
          setDateEvents([]);
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  }, [selectedDate]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formattedSelectedDate = formatDate(selectedDate);

  return (
    <div className="App">
      <header className="App-header">
        <p>This is my Calendar</p>
        <h1>Calendar</h1>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <div className="events-container">
            <div className="new-event">
              <input
                type="text"
                placeholder="Enter Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <button onClick={handleNewEvent} className="new-event-button">
                New Event
              </button>
            </div>
            <h2>Events on {formattedSelectedDate}</h2>
            {dateEvents.length > 0 ? (
              dateEvents.map((event, index) => (
                <div key={index} className="event">
                  {event.title}
                </div>
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
