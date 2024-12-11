import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Create a Context for authentication
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null); // Initialize token state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticateToken = async (token) => {
        try {
            console.log(`Authorization token: ${token}`)
            const response = await axios.get('http://localhost:8000/authenticateToken', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Token authentication failed:', error);
            return null;
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                const result = await authenticateToken(token);
                setIsAuthenticated(result !== null);
            } else {
                setIsAuthenticated(false);
            }
        };
        verifyToken();
    }, [token]);

    const login = (newToken) => {
        setToken(newToken); // Set the token when logging in
    };

    const logout = () => {
        setToken(null); // Clear the token on logout
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Prop types validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
