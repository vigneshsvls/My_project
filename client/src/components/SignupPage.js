import React, { useState } from 'react';
import './SignupPage.css';
import axios from 'axios';
import config from './config'


const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

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
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            const response = await axios.post(`${config.BASE_URL}/register`, {
                name,
                email,
                password
            });

            console.log('Signup successful:', response.data);
            // Optionally redirect or show a success message
        } catch (error) {
            console.error('Signup failed:', error);
            // Optionally show an error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div class="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} class="form-container">
                <div class="name-container">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div>
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

                <div>
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

                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        disabled={isSubmitting}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} class="signup-button">
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <div class="login-link">
                <p> Already have an account? </p><a href="/login">Log in</a>
            </div>
        </div>
    );
};

export default SignupPage;
