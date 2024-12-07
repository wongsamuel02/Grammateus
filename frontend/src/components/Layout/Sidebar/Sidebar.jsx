import {
    FaTh
} from "react-icons/fa"
import {
    IoMdLogOut,
} from "react-icons/io"
import { useLayout } from '../Layout'
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    const { isOpen } = useLayout();
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh />
        },
        {
            path:"/register",
            name:"Register",
            icon:<FaTh />
        },
        {
            path: "/patients",
            name:"Patients"

        },
        {
            path: "/history",
            name:"History"

        },
        {
            path:"/logout",
            name:"Logout",
            icon:<IoMdLogOut />
        }
    ]

    return (
        <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
            <h1>Grammateus</h1>
            <div>
                {
                    menuItem.map((item, index)=> (
                        <NavLink to={item.path} key={index} className="sidebar-item">
                            <span className="sidebar-icon">{item.icon}</span>
                            <p>{item.name}</p>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}