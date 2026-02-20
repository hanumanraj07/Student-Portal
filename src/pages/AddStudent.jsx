// AddStudent.jsx — Form with validation, saves to localStorage

import { useState } from 'react';

// Initial form state
const initialForm = { name: '', email: '', phone: '', gender: '' };
const initialErrors = { name: '', email: '', phone: '', gender: '' };

function AddStudent() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [successMsg, setSuccessMsg] = useState('');
    const [addedStudent, setAddedStudent] = useState(null); // Bonus: show newly added student

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear the error for this field on change
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Validate all fields; returns true if valid
    const validate = () => {
        const newErrors = { name: '', email: '', phone: '', gender: '' };
        let valid = true;

        if (!form.name.trim()) {
            newErrors.name = 'Name cannot be empty.';
            valid = false;
        }
        if (!form.email.includes('@')) {
            newErrors.email = 'Email must contain "@".';
            valid = false;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = 'Phone must be exactly 10 digits.';
            valid = false;
        }
        if (!form.gender) {
            newErrors.gender = 'Please select a gender.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setAddedStudent(null);

        if (!validate()) return;

        // Build the student object
        const newStudent = {
            id: Date.now(),
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            gender: form.gender,
        };

        // Read existing students from localStorage, append new one, save back
        try {
            const existing = JSON.parse(localStorage.getItem('students') || '[]');
            existing.push(newStudent);
            localStorage.setItem('students', JSON.stringify(existing));
        } catch {
            localStorage.setItem('students', JSON.stringify([newStudent]));
        }

        setSuccessMsg('✅ Student added successfully!');
        setAddedStudent(newStudent); // Bonus: display the added student
        setForm(initialForm);        // Clear form
        setErrors(initialErrors);
    };

    return (
        <div className="page">
            <div className="form-container">
                <h1>Add Student</h1>
                <p className="page-subtitle">Create New Database Entry</p>

                <form className="glass-card terminal-form" onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className="form-group">
                        <span className="label-mono">Entry / Full_Name</span>
                        <input
                            id="name"
                            className="form-input"
                            type="text"
                            name="name"
                            placeholder="INPUT_TEXT"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error-text">ERR: {errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <span className="label-mono">Entry / Comm_Addr</span>
                        <input
                            id="email"
                            className="form-input"
                            type="text"
                            name="email"
                            placeholder="INPUT_EMAIL"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text">ERR: {errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <span className="label-mono">Entry / Voice_Link</span>
                        <input
                            id="phone"
                            className="form-input"
                            type="text"
                            name="phone"
                            placeholder="INPUT_VALUE[10]"
                            value={form.phone}
                            onChange={handleChange}
                            maxLength={10}
                        />
                        {errors.phone && <span className="error-text">ERR: {errors.phone}</span>}
                    </div>

                    {/* Gender */}
                    <div className="form-group">
                        <span className="label-mono">Entry / Gender_ID</span>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={form.gender === 'Male'}
                                    onChange={handleChange}
                                />
                                <span className="radio-btn">♂ MALE</span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={form.gender === 'Female'}
                                    onChange={handleChange}
                                />
                                <span className="radio-btn">♀ FEMALE</span>
                            </label>
                        </div>
                        {errors.gender && <span className="error-text">ERR: {errors.gender}</span>}
                    </div>

                    <div className="full-width">
                        <button type="submit" className="btn-submit">INITIALIZE_SAVE_SEQUENCE</button>
                    </div>
                </form>

                {/* Success Banner */}
                {successMsg && <div className="success-banner">{successMsg}</div>}

                {/* Bonus Student Details */}
                {addedStudent && (
                    <div className="glass-card student-card" style={{ marginTop: '3rem', animation: 'fadeIn 0.5s ease' }}>
                        <span className="label-mono" style={{ color: 'var(--accent)' }}>Dossier Created // Finalized</span>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', alignItems: 'center' }}>
                            <div className="card-avatar">{addedStudent.name.charAt(0)}</div>
                            <div>
                                <h4 className="card-name" style={{ margin: 0 }}>{addedStudent.name}</h4>
                                <p className="card-info">{addedStudent.email}</p>
                                <p className="card-info">{addedStudent.phone} • {addedStudent.gender}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddStudent;
