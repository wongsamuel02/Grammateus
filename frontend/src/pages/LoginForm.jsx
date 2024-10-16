import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from '../api/axios';
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
            const response = await axios.post(LOGIN_URL,
                {
                    'email': email,
                    'password': password
                }, 
            )
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            setAuth({ email, password, accessToken })
            setEmail('');
            setPassword('');
            console.log("Navigating from:", from);
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

            <div className="container mt-5 border p-4 rounded shadow" style={{ width: '450px' }} >
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <div className="mt-3 text-center">
                        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}