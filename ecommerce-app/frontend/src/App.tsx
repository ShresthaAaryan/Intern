import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from './Login/Login'
import Signup from './Signup/Signup';
import Home from './home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
