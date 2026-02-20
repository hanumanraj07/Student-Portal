// Home.jsx — Home page: reads students from localStorage and shows count

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
    // State to hold the list of students from localStorage
    const [students, setStudents] = useState([]);

    // On mount, read "students" key from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('students');
            if (stored) {
                setStudents(JSON.parse(stored));
            }
        } catch (err) {
            // If parsing fails, treat as empty
            setStudents([]);
        }
    }, []);

    // State for live clock
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour12: false });

    return (
        <div className="page home-page">
            <div className="hero-section">
                <span className="label-mono">System Dashboard // Initialized</span>
                <h1 className="hero-title">Student Portal</h1>
            </div>

            <div className="terminal-grid">
                <div className="glass-card dossier-card">
                    <span className="label-mono">Database / Status</span>
                    {students.length === 0 ? (
                        <p className="no-data-msg">No entries found in local database.</p>
                    ) : (
                        <div className="stat-content">
                            <span className="stat-value">{students.length}</span>
                            <p className="stat-label">Active Dossiers Registered</p>
                        </div>
                    )}
                </div>

                <div className="side-terminal">
                    <div className="glass-card" style={{ marginBottom: '1rem' }}>
                        <span className="label-mono">System Time</span>
                        <div className="system-clock">{formattedTime}</div>
                    </div>

                    <div className="quick-actions-grid">
                        <NavLink to="/students" className="action-btn">ACCESS_DATABASE</NavLink>
                        <NavLink to="/add" className="action-btn">NEW_ENTRY</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
