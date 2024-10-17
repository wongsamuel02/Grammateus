import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill in both fields.');
            return;
        }

        try {
            const response = await axios.post('/register',
                {
                    'email': email,
                    'password': password
                }, 
            )
            console.log(JSON.stringify(response?.data));

            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Signup Failed')
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
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
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
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <a href="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            Back to login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}