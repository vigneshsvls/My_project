import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import config from './config'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();


    const validateForm=() => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Invalid email format';
            }
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`${config.BASE_URL}/login`, {
                email,
                password
            });

            console.log('Login successful:', response.data);
            localStorage.setItem('userEmail', email);
            navigate('/enter'); // Redirect
            // Optionally redirect or save token etc.
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response && error.response.data.message) {
                setErrors({ general: error.response.data.message });
            } else {
                setErrors({ general: 'An error occurred. Please try again.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div class="login-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} class="form-container">
                {errors.general && <p>{errors.general}</p>}

                <div class="email-container">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={isSubmitting}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div class="password-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        disabled={isSubmitting}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} class="login-button">
                    {isSubmitting ? 'Logging In...' : 'Log In'}
                </button>
            </form>
            <div class="signup-link">
                <p>Don't have an account?</p> <a href="/register">Sign up</a>
            </div>
        </div>
    );
};

export default LoginPage;
