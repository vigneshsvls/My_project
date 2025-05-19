import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import EnterPage from './components/EnterPage';
import NearbyPage from './components/NearbyPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Navbar from './components/Navbar';
import MyProfile from './components/MyProfile';

function App() {
  useEffect(() => {
    document.title = "ReachR";
  }, []);
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/profile" element={<MyProfile />} /> 
          <Route path="/enter" element={<EnterPage />} />
          <Route path="/nearby" element={<NearbyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
