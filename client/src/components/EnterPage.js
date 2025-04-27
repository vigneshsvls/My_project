import React, { useState } from 'react';
import './EnterPage.css';

import axios from 'axios';

const EnterPage = () => {
    const [socialMediaList, setSocialMediaList] = useState([{ platform: '', socialId: '' }]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const email = localStorage.getItem('userEmail'); // Get email after login

    // 👉 ADD this function HERE
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    };

    const handleChange = (index, event) => {
        const newSocialMediaList = [...socialMediaList];
        newSocialMediaList[index][event.target.name] = event.target.value;
        setSocialMediaList(newSocialMediaList);
    };

    const handleAddSocialMedia = () => {
        setSocialMediaList([...socialMediaList, { platform: '', socialId: '' }]);
    };

    const handleRemoveSocialMedia = (index) => {
        const newSocialMediaList = socialMediaList.filter((_, i) => i !== index);
        setSocialMediaList(newSocialMediaList);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const { latitude, longitude } = await getLocation(); // 📍 Get location before submitting

            for (const entry of socialMediaList) {
                const { platform, socialId } = entry;
                if (platform.trim() && socialId.trim()) {
                    await axios.post('http://localhost:9000/enter', {
                        email,
                        platform,
                        socialId,
                        latitude,
                        longitude, // 📍 Send location along with data
                    });
                }
            }

            setMessage('All social media info saved successfully!');
            setSocialMediaList([{ platform: '', socialId: '' }]); // Reset form
        } catch (error) {
            console.error('Error saving social media info:', error);
            setMessage('Failed to save. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <h2>Enter Your Social Media Details</h2>
            <form onSubmit={handleSubmit}>
                {socialMediaList.map((socialMedia, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor={`platform-${index}`}>Social Media Name</label>
                            <input
                                type="text"
                                id={`platform-${index}`}
                                name="platform"
                                value={socialMedia.platform}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g., Instagram, LinkedIn"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor={`socialId-${index}`}>Social Media ID</label>
                            <input
                                type="text"
                                id={`socialId-${index}`}
                                name="socialId"
                                value={socialMedia.socialId}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g., your_username"
                                disabled={isSubmitting}
                            />
                        </div>
                        {socialMediaList.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveSocialMedia(index)}
                                disabled={isSubmitting}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddSocialMedia} disabled={isSubmitting}>
                    Add Social Media
                </button>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default EnterPage;
