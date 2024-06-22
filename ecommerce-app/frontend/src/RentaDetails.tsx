import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './RentaDetails.css';
import { Button } from './stories/Button';
import "./App.css"

interface Rental {
  _id: string;
  name: string;
  type: string;
  address: string;
  availability: boolean;
  price: number;
  description: string;
  owner: string;
}

const RentalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rental, setRental] = useState<Rental | null>(null);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Rental>(`http://localhost:8000/rentals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRental(response.data);
      } catch (error) {
        console.error('Error fetching rental details:', error);
        setError('Failed to fetch rental details');
      }
    };

    fetchRental();
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/rentals/${id}/book`, {
        name,
        address,
        age,
        phoneNumber,
        dateOfBirth,
        email,
        fromDate,
        toDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Booking successful');
      navigate('/home');
    } catch (error) {
      console.error('Error booking rental:', error);
      setError('Failed to book rental');
    }
  };

  const handleUserProfile = () => {
    navigate("/user-profile");
  };

  return (
    <div>
      {rental ? (
        <div className="rental-details">
          <h1>{rental.name}</h1>
          <p>Type: {rental.type}</p>
          <p>Address: {rental.address}</p>
          <p>Availability: {rental.availability ? 'Available' : 'Not Available'}</p>
          <p>Price: ${rental.price}</p>
          <p>Description: {rental.description}</p>
          <button onClick={handleUserProfile}>Go to Profile</button>
          <button onClick={logout}>Logout</button>
          <div>
          <form className="form" onSubmit={handleBooking}>
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
                                        value={age || ''}
                                        onChange={(e) => { 
                                            const value = parseInt(e.target.value); // Convert string to number
                                            setAge(isNaN(value) ? undefined : value); // If conversion fails, set age to undefined
                                        }}
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
                                <input 
                                    placeholder="Enter your Date of Birth" 
                                    className="input" 
                                    type="date" 
                                    name="dateOfBirth" 
                                    required 
                                    value={dateOfBirth}
                                    onChange={(e)=>{setDateOfBirth(e.target.value)}}
                                />
                            <div className="flex-column">
                                <label>From</label>
                            </div>
                                <input 
                                    placeholder="From Date" 
                                    className="input" 
                                    type="date" 
                                    name="fromDate" 
                                    required 
                                    value={fromDate}
                                    onChange={(e)=>{setFromDate(e.target.value)}}
                                />
                            <div className="flex-column">
                                <label>To</label>
                            </div>
                                <input 
                                    placeholder="To Date" 
                                    className="input" 
                                    type="date" 
                                    name="toDate" 
                                    required 
                                    value={toDate}
                                    onChange={(e)=>{setToDate(e.target.value)}}
                                />
                            {error && <div className="error">{error}</div>}
                            <Button
                                label="Book"
                                primary
                                className="button-submit"
                            />
                            <Button
                                label="Go to Profile"
                                className="button-profile"
                                onClick={handleUserProfile}
                            />
                        </form>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RentalDetails;
