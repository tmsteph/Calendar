import logo from './logo.svg';
import './App.css';
import Calendar from 'react-calendar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is my Calendar
        </p>
        <h3>
          Calendar
        </h3>
        <Calendar />
      </header>
    </div>
  );
}

export default App;
