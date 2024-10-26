import React from 'react';
import useLogout from '../hooks/useLogout';

const LogoutButton = () => {
    const logout = useLogout();

    const handleLogout = async () => {
        try {
            await logout();
            // You can redirect to the login page or home page after logout
            window.location.href = '/login'; // or use your router's navigate function
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;