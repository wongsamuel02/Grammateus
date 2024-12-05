import './Navbar.css';
import { MdDehaze } from "react-icons/md";
import { useLayout } from '../Layout'

export default function Navbar() {
    const { toggleSidebar } = useLayout();  // Access the toggle function

    return (
        <div className='navbar'>
            <MdDehaze className='hamburger' onClick={toggleSidebar}/> 
        </div>   
    )
}

