import React, { useState, useEffect } from 'react';
import './NearbyPage.css';

import axios from 'axios';

const NearbyPage = () => {
    const [nearbyUsers, setNearbyUsers] = useState([]);

    useEffect(() => {
        const fetchNearbyUsers = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const response = await axios.post('http://localhost:9000/nearby', {
                        latitude,
                        longitude
                    });

                    setNearbyUsers(response.data);
                });
            } catch (error) {
                console.error('Error fetching nearby users:', error);
            }
        };

        fetchNearbyUsers();
    }, []);

    return (
        <div>
            <h2>Nearby People (within 100m)</h2>
            {nearbyUsers.length === 0 ? (
                <p>No nearby users found.</p>
            ) : (
                nearbyUsers.map((user, index) => (
                    <div key={index}>
                        <h4>{user.name}</h4>
                        <ul>
                            {Object.entries(user.linkedSocialMedia).map(([platform, id]) => (
                                <li key={platform}>
                                    {platform}: {id}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default NearbyPage;
