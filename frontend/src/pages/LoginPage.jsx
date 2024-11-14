import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from "../components/AuthProvider";

export default function LoginForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password
            });

            // Call the login function from context with the received access token
            login(response.data.accessToken);
            console.log('Access Token:', response.data.accessToken);
            // You can redirect or perform any other actions here after successful login
        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
            alert('Login failed!');
        }

        // Clear the input fields after submission
        setEmail('');
        setPassword('');
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}