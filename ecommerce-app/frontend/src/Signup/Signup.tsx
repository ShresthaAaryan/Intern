import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button } from "../stories/Button";
import '../App.css';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState<number | string>("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [error, setError] = useState("");

    const handleSignInNavigation = () => {
        navigate("/login");
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8000/signup", {
                email,
                password,
                name,
                address,
                age,
                phoneNumber,
                dateOfBirth,
            });
            
            if (response.data === "User registered successfully") {
                setEmail("");
                setPassword("");
                setName("");
                setAddress("");
                setAge("");
                setPhoneNumber("");
                setDateOfBirth("");
                navigate("/login");
            } else {
                setError(response.data);
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred during signup. Please try again.");
        }
    };

    return (
        <form className="form" onSubmit={submit}>
            <div className="flex-column">
                <label>Email</label>
            </div>
            <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                    <g data-name="Layer 3" id="Layer_3">
                        <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"/>
                    </g>
                </svg>
                <input 
                    placeholder="Enter your Email" 
                    className="input" 
                    type="email" 
                    name="email" 
                    required 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
            </div>
            <div className="flex-column">
                <label>Password</label>
            </div>
            <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"/>
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"/>
                </svg>        
                <input 
                    placeholder="Enter your Password" 
                    className="input" 
                    type="password" 
                    name="password" 
                    required 
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <div className="flex-column">
                <label>Name</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Name" 
                    className="input" 
                    type="text" 
                    name="name" 
                    required 
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                />
            </div>
            <div className="flex-column">
                <label>Address</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Address" 
                    className="input" 
                    type="text" 
                    name="address" 
                    required 
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                />
            </div>
            <div className="flex-column">
                <label>Age</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Age" 
                    className="input" 
                    type="number" 
                    name="age" 
                    required 
                    value={age}
                    onChange={(e)=>{setAge(e.target.value)}}
                />
            </div>
            <div className="flex-column">
                <label>Phone Number</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Phone Number" 
                    className="input" 
                    type="text" 
                    name="phoneNumber" 
                    required 
                    value={phoneNumber}
                    onChange={(e)=>{setPhoneNumber(e.target.value)}}
                />
            </div>
            <div className="flex-column">
                <label>Date of Birth</label>
            </div>
            <div className="inputForm">
                <input 
                    placeholder="Enter your Date of Birth" 
                    className="input" 
                    type="date" 
                    name="dateOfBirth" 
                    required 
                    value={dateOfBirth}
                    onChange={(e)=>{setDateOfBirth(e.target.value)}}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <Button
                label="Sign Up"
                primary
                className="button-submit"
            />
            <p className="p">Already have an account? <span onClick={handleSignInNavigation} className="span">Sign In</span></p>
        </form>
    );
};

export default Signup;
