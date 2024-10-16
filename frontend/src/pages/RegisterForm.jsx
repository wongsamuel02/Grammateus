import React, { useState } from "react";
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegisterForm() {
    // const navigate = useNavigate();
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

        // try {
        //     const response = await axios.post('http://localhost:8000/login', {
        //         username: email, // Replace 'someUsername' with the actual username variable
        //         password: password   // Replace 'somePassword' with the actual password variable
        //     });

        //     // Call the login function from context with the received access token
        //     const token = response.data.accessToken
        //     if (!token) {
        //         console.log("Error")
        //     }
        //     localStorage.setItem('token', token);
        //     navigate("/Home");
        // } catch (error) {
        //     console.error('Error during login:', error.response ? error.response.data : error.message);
        //     alert(`Login failed! Error Resp: ${error.response}, ${error.response ? error.response.data : error.message}`);
        // }

        // Clear the input fields after submission
        setEmail('');
        setPassword('');
    };

    return(
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
    );
}