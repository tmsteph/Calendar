import './App.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          This is my Calendar
        </p>
        
        <h1>
          Calendar
        </h1>
        
        <Calendar onChange={	(value, event) => alert('New date is: ' + value)}/>
        
         
      </header>


      
    </div>
  );
}

export default App;
