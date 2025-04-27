import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import React from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail'); // 🛑 Check if user logged in

    const handleLogout = () => {
        localStorage.removeItem('userEmail'); 
        navigate('/login');
    };

    // If no userEmail (not logged in), don't show navbar
    if (!userEmail) {
        return null;
    }

    return (
        // <nav style={{ marginBottom: '20px' }}>
        //     <Link to="/enter" style={{ marginRight: '10px' }}>Add Social Media</Link>
        //     <Link to="/nearby" style={{ marginRight: '10px' }}>Nearby People</Link>
        //     <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
        //         Logout
        //     </button>
        // </nav>
        <nav>
  <div className="nav-links">
    <Link to="/enter">Add Social Media</Link>
    <Link to="/nearby">Nearby People</Link>
  </div>
  <button className="logout-button" onClick={handleLogout}>Logout</button>
</nav>

    );
};

export default Navbar;
