import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NearbyPage.css';

const NearbyPage = () => {
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNearbyUsers = async () => {
            if (navigator.geolocation) {
                setLoading(true);

                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        try {
                            // Update user's location in the backend
                            const email = localStorage.getItem('userEmail'); // Get the logged-in user's email
                            await axios.post('http://localhost:9000/update-location', {
                                email,
                                latitude,
                                longitude
                            });

                            // Now fetch nearby users based on current location
                            const response = await axios.post('http://localhost:9000/nearby', {
                                latitude,
                                longitude
                            });

                            setNearbyUsers(response.data);
                        } catch (err) {
                            setError('Failed to fetch nearby users');
                            console.error('Error fetching nearby users:', err);
                        } finally {
                            setLoading(false);
                        }
                    },
                    (error) => {
                        setError('Failed to retrieve geolocation');
                        console.error('Geolocation error:', error);
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser');
                setLoading(false);
            }
        };

        fetchNearbyUsers();
    }, []);

    return (
        <div className="page-container">
            <h2>Nearby People (within 100m)</h2>

            {loading && <p>Loading nearby users...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && nearbyUsers.length === 0 && !error && (
                <p className="no-users-message">No nearby users found.</p>
            )}

            {!loading && nearbyUsers.length > 0 && (
                nearbyUsers.map((user, index) => (
                    <div key={index} className="user-card">
                        <h4>{user.name}</h4>
                        <ul>
                            {Object.entries(user.linkedSocialMedia).map(([platform, id]) => (
                                <li key={platform}>
                                    <span className="platform">{platform}:</span> {id}
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
