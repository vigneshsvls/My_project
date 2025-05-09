import React, { useState } from 'react';
import './EnterPage.css';
import config from './config'
const EnterPage = () => {
    const [socialMediaList, setSocialMediaList] = useState([{ platform: '', socialId: '' }]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const email = localStorage.getItem('userEmail'); // Get email after login

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
            // Simulate saving data
            setTimeout(() => {
                setMessage('All social media info saved successfully!');
                setSocialMediaList([{ platform: '', socialId: '' }]); // Reset form
                setIsSubmitting(false);
            }, 1000);
        } catch (error) {
            console.error('Error saving social media info:', error);
            setMessage('Failed to save. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <h2>Enter Your Social Media Details</h2>
            <form onSubmit={handleSubmit} className="form-container">
                {socialMediaList.map((socialMedia, index) => (
                    <div key={index} className="social-media-group">
                        <div>
                            <label htmlFor={`platform-${index}`} className="social-labels">
                                Social Media Name
                            </label>
                            <input
                                type="text"
                                id={`platform-${index}`}
                                name="platform"
                                value={socialMedia.platform}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g., Instagram, LinkedIn"
                                disabled={isSubmitting}
                                className="social-inputs"
                            />
                        </div>
                        <div>
                            <label htmlFor={`socialId-${index}`} className="social-labels">
                                Social Media ID
                            </label>
                            <input
                                type="text"
                                id={`socialId-${index}`}
                                name="socialId"
                                value={socialMedia.socialId}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g., your_username"
                                disabled={isSubmitting}
                                className="social-inputs"
                            />
                        </div>
                        {socialMediaList.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveSocialMedia(index)}
                                disabled={isSubmitting}
                                className="remove-button"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddSocialMedia}
                    disabled={isSubmitting}
                    className="add-button"
                >
                    Add Social Media
                </button>
                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default EnterPage;