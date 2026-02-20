// Navbar.jsx — Navigation bar shown on every page

import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span>Student Portal</span>
                <div className="system-status">
                    <div className="status-dot"></div>
                    <span>SYS.ON_LINE</span>
                </div>
            </div>
            <ul className="navbar-links">
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/students">Students</NavLink></li>
                <li><NavLink to="/add">Add Student</NavLink></li>
                <li><NavLink to="/counter">Counter</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;
