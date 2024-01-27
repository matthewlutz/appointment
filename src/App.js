import logo from './logo.svg';
import './App.css';

function App() {   
  return (
    <div>
      <div className="header">
        <h1>Welcome to the Appointment Booking System</h1>
      </div>

      <div className="nav-bar">
        <a href="#medical">Medical</a>
        <a href="#beauty">Beauty</a>
        <a href="#fitness">Fitness</a>
        <a href="#login" className="login">Login</a>
      </div>

      <div className="container">
        <div id="medical" className="category">
          <h2>Medical Appointments</h2>
          <p>Book your medical appointments here.</p>
        </div>

        <div id="beauty" className="category">
          <h2>Beauty Services</h2>
          <p>Explore and book beauty services.</p>
        </div>

        <div id="fitness" className="category">
          <h2>Fitness Sessions</h2>
          <p>Join fitness sessions and maintain your health.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
