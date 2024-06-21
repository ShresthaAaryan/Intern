// src/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './App.css';

interface User {
  email: string;
  password: string;
}

const UserProfile: React.FC = () => {
  const { token, userId, logout } = useAuth();
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

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
      setError('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update profile. Please try again.');
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
        {error && <div className="error">{error}</div>}
        <button className="button-submit" type="submit">Update Profile</button>
        <button className="button-logout" type="button" onClick={logout}>Logout</button>
      </form>
    </div>
  );
};

export default UserProfile;
