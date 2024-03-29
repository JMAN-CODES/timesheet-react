import logo from './logo.svg';
import './App.css';
import TimeSheet from './components/sheet';
import Dashboard from './components/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='parent'>
        
        <div className='dashboard'>
          <ul>
            
              <a href="/"><li>Dashboard</li></a>
              <a href='timesheet'><li>TimeSheet</li></a>
              <li>Leave</li>
              <li>Work From Home</li>
              <li>Feedback</li>
              <li>Survey</li>
              <li>Service Deck</li>
              <li>Forms</li>
              <li>Travel</li>
              <li>Expenses</li>
              <li>Resourcing</li>
            
          </ul>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='timesheet' element={<TimeSheet />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
