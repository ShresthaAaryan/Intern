import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../App.css';
import { Button } from '../stories/Button';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUpNavigation = () => {
        navigate("/signup");
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            console.log('Response from server:', response.data); // Debugging log

            if (response.data.token && response.data.userId) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                console.log('Token and userId stored in localStorage'); // Debugging log
                navigate("/home");
            } else {
                setError("Invalid email or password");
                console.log('Invalid email or password'); // Debugging log
            }
        } catch (error) {
            console.error('Error during login:', error); // Debugging log
            setError("An error occurred during login. Please try again.");
        }
    };

    return (
        <form className="form" onSubmit={submit}>
            <div className="flex-column">
                <label>Email</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Email" 
                    className="input" 
                    type="email" 
                    name="email" 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex-column">
                <label>Password</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Password" 
                    className="input" 
                    type="password" 
                    name="password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <Button
                label="Sign In"
                primary
                className="button-submit"
            />
            <p className="p">Don't have an account? <span className="span" onClick={handleSignUpNavigation}>Sign Up</span></p>
        </form>
    );
};

export default Login;
