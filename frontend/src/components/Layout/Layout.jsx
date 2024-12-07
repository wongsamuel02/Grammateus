import React, { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import './Layout.css'

// Create a context for the layout state
const LayoutContext = createContext();

export const useLayout = () => {
    return useContext(LayoutContext);  // Custom hook for easy access
};

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <LayoutContext.Provider value={{ isOpen, toggleSidebar }}>
            <div className="main-container">
                <Sidebar />
                <div>
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </LayoutContext.Provider>
    );
};

export default Layout;