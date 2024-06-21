// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './home';
import AddRental from './AddRental/AddRental';
import EditRental from './EditRental';
import UserProfile from './UserProfile';

import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider should be nested within Router */}
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-rental" element={<AddRental />} />
          <Route path="/edit-rental/:id" element={<EditRental />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
