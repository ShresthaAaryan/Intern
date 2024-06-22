import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './App.css';

interface User {
    email: string;
    password: string;
    name: string;
    address: string;
    age: number | string;
    phoneNumber: string;
    dateOfBirth: string;
}

const UserProfile: React.FC = () => {
    const { token, userId, logout } = useAuth();
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
        name: '',
        address: '',
        age: '',
        phoneNumber: '',
        dateOfBirth: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:8000/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Failed to fetch user');
            }
        };

        if (token && userId) {
            fetchUser();
        }
    }, [token, userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/user/${userId}`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Update User Response:', response.data);
            setSuccessMessage('Profile updated successfully');
            setError(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update profile. Please try again.');
            setSuccessMessage(null);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                    <label>Email</label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Password</label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Address</label>
                    <input
                        className="input"
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Age</label>
                    <input
                        className="input"
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Phone Number</label>
                    <input
                        className="input"
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex-column">
                    <label>Date of Birth</label>
                    <input
                        className="input"
                        type="date"
                        name="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
                <button className="button-submit" type="submit">Update Profile</button>
                <button className="button-logout" type="button" onClick={logout}>Logout</button>
            </form>
        </div>
    );
};

export default UserProfile;
