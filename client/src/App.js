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


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnterPage from './components/EnterPage';
import NearbyPage from './components/NearbyPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Navbar from './components/Navbar'; // 🛑 Import Navbar

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* 🛑 Add Navbar at the top */}
        <Routes>
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
