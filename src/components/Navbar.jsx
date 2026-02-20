// Navbar.jsx — Navigation bar shown on every page

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span>Student Portal</span>
                <div className="system-status">
                    <div className="status-dot"></div>
                    <span>SYS.ON_LINE</span>
                </div>
            </div>

            <button
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li><NavLink to="/" end onClick={() => setIsOpen(false)}>Home</NavLink></li>
                <li><NavLink to="/students" onClick={() => setIsOpen(false)}>Students</NavLink></li>
                <li><NavLink to="/add" onClick={() => setIsOpen(false)}>Add Student</NavLink></li>
                <li><NavLink to="/counter" onClick={() => setIsOpen(false)}>Counter</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;

