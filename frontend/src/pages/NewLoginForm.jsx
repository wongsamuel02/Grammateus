import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/LoginForm.css";

const LOGIN_URL = '/auth';

export default function LoginForm() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(LOGIN_URL,
                {
                    'email': email,
                    'password': password
                }
            )

            const accessToken = response?.data?.accessToken;
            setAuth({ email, password, accessToken })
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
        }

        // Clear the input fields after submission
        setEmail('');
        setPassword('');
    };
    return (
        <div className="login-container">
            {errMsg && (
                <div className="alert alert-danger" role="alert">
                    {errMsg}
                </div>
            )}
            <div className="login-form">
                <h2>Login</h2>
                <p>Welcome to Pharmacist Platform</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="#">Forgot?</a>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="login-illustration">
                <img
                    src="/images/illustration.jpg"
                    alt="Login Illustration"
                />
            </div>
        </div>
    );
}