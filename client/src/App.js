// import SignupPage from './SignupPage'
// import LoginPage from './LoginPage'
// import { useNavigate } from 'react-router-dom';
// import EnterPage from './EnterPage';
// import './App.css'
// import {BrowserRouter, Router, Routes, Route} from 'react-router-dom'

// function App() {
//   return(
//     <BrowserRouter>
//     <Routes>
//       <Route path="/register" element={<SignupPage />} ></Route>
//        <Route path="/login" element={<LoginPage />} /> 
//        <Route path="/enter" element={<EnterPage />} />
//         <Route path="*" element={<LoginPage />} /> {/* Default to login */}
//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


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
        <Navbar /> {/* 🛑 Add Navbar at the top */}
        <Routes>
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
