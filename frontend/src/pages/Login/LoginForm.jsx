import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';
import { CiLock, CiUser } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css'

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

    return(
        <div>
            {errMsg && (  // Only render if there is an error message
                <div className="alert alert-danger" role="alert">
                  {errMsg}
                </div>
              )}
            
            <div className="login-page-container">
                <div className="left-container">
                    <h1>Grammateus</h1>
                    <div className="image-container">
                        <img src="/login-logo.png" alt="Doctor Examining Patient" />
                    </div>
                    <h2>Welcome!</h2>
                    <p>Summarize your doctor-patient transcriptions at the click of a button with Grammateus</p>
                </div>
                <div className="right-container">
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input
                                type="email"
                                className="input-field"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <CiUser />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                className="input-field"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <CiLock />
                        </div>
                        <button type="submit" className="submit-button">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}