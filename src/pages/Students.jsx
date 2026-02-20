// Students.jsx — Fetches users from JSONPlaceholder API and shows first 6 as cards

import { useState, useEffect } from 'react';

function Students() {
    const [users, setUsers] = useState([]);
    const [localStudents, setLocalStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Load local students
        try {
            const stored = JSON.parse(localStorage.getItem('students') || '[]');
            setLocalStudents(stored);
        } catch (e) {
            setLocalStudents([]);
        }

        // Fetch users from public API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setUsers(data.slice(0, 6)); // Only first 6 users
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || 'Failed to fetch students.');
                setLoading(false);
            });
    }, []);

    // Merge both sources
    const allUsers = [...localStudents, ...users];

    const filteredUsers = allUsers.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="page">
                <h1>Students</h1>
                <p className="page-subtitle">Syncing Remote Database...</p>
                <div className="cards-grid">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="glass-card skeleton-card"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className="glass-card" style={{ borderColor: 'var(--error)', textAlign: 'center' }}>
                    <span className="label-mono" style={{ color: 'var(--error)' }}>Critical Failure</span>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>Students</h1>
            <p className="page-subtitle">Active Directory / Access Group: 01</p>

            <div className="filter-bar">
                <input
                    type="text"
                    className="filter-input"
                    placeholder="KEYWORD_SEARCH // [NAME_OR_EMAIL]..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="cards-grid">
                {filteredUsers.map((user) => (
                    <div className="glass-card student-card" key={user.id}>
                        <div className="card-avatar">{user.name.charAt(0)}</div>
                        <span className="label-mono">Entry #{user.id}</span>
                        <h3 className="card-name">{user.name}</h3>
                        <p className="card-info">EMAIL: {user.email}</p>
                        <p className="card-info">PHONE: {user.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Students;
