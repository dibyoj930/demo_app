import logo from './logo.svg';
import './App.css';
import Welcome from './Components/Welcome';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

import CameraCapture from './Components/CameraCapture';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
      <Route path="/token/:userId" element={<CameraCapture/>} />
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
