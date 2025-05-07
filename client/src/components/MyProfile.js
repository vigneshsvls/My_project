import React, { useEffect, useState } from 'react';
import './MyProfile.css'; // Import the CSS file

const MyProfile = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const email = localStorage.getItem('userEmail'); // Get the logged-in user's email

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:9000/accounts?email=${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch accounts');
                }
                const data = await response.json();
                setAccounts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, [email]); //email is a dependency array.

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            {loading ? (
                <p className="loading-message">Loading accounts...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : accounts.length === 0 ? (
                <p className="no-accounts-message">No accounts found.</p>
            ) : (
                <div className="accounts-table">
                    {accounts.map((account, index) => (
                        <div key={index} className="account-row">
                            <span className="account-platform">{account.platform}</span>
                            <span className="account-id">{account.socialId}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProfile;