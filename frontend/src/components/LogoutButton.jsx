import React from 'react';
import useLogout from '../hooks/useLogout';

const LogoutButton = () => {
    const logout = useLogout();

    const handleLogout = async () => {
        try {
            await logout();
            
            window.location.href = '/login';
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-primary mx-2">
            Logout
        </button>
    );
};

export default LogoutButton;