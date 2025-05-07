import React from "react";
import Navbar from "./Navbar";
import "./homepage.css"

const Homepage = () => {
    return(
        <div>
            {/* <Navbar /> */}
            {/* Add your homepage content here */}
            <div class="homepage-container">
                <div class="homepage-header">
                    <h1>ReachR</h1>
                </div>
                <div class="homepage-content">
                    <p>Reachr is a real-time, proximity-based social discovery app that helps you find and connect with people around you — within just 100 meters. 
                       Reachr makes it easy to discover who's nearby and share your vibe.</p>
                    <p>Connect with people nearby and expand your social network.</p>
                    {/* <p>Join us today!</p> */}
                </div>
            </div>

            {/* <h1>Welcome to REACHR Application</h1> */}
        </div>
    );
};

export default Homepage;
