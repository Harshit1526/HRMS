import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginSignup.css';
import user_icon from '../HR/src/components/Assests/person.png';
import email_icon from '../HR/src/components/Assests/email.png';
import password_icon from '../HR/src/components/Assests/password.png';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!isLogin && !username.trim()) errors.username = 'Username is required';
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const handleSignUp = async () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSuccessMessage('Signup successful! You can now proceed to the Login');
        setErrors({});
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleLogin = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        navigate("/dashboard");



        
        // Simulate successful login
        // if user validte navigate to dashboard
        navigate("/hr_dashboard"); 
        // setSuccessMessage('Login successful! You can now proceed to the Dashboard.');

        setErrors({});
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <div className='container'>
                <div className="header">
                    <div className="text">{isLogin ? "Login" : "Sign Up"}</div>
                    <div className="Underline"></div>
                </div>
                <div className="inputs">
                    {!isLogin && (
                        <div>
                        <div className='input'>
                            <img src={user_icon} alt="User Icon" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                            {errors.username && <p className="error">{errors.username}</p>}
                        </div>
                    )}

                    <div className="input">
                        <img src={email_icon} alt="Email Icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                        {errors.email && <p className="error">{errors.email}</p>}

                    <div className="input">
                        <img src={password_icon} alt="Password Icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                    {errors.server && <p className="error">{errors.server}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                </div>
                <div className="forgot-Password">{isLogin ? "Forgot Password?" : ""}</div>
                <div className="submit-container">
                    <div
                        className="submit"
                        onClick={isLogin ? handleLogin : handleSignUp}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </div>
                    <div
                        className="submit"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setSuccessMessage('');
                            setErrors({});
                            setUsername('');
                            setEmail('');
                            setPassword('');
                        }}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </div>
                </div>
                {successMessage && (
                    <div className="dashboard-link">
                        <Link to="/dashboard">Go to Dashboard</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default LoginSignup;
