// Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddRental from './AddRental/AddRental';
import './Home.css';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching rentals with token:', token);
        const response = await axios.get<Rental[]>('http://localhost:8000/rentals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Rentals fetched:', response.data);
        setRentals(response.data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
        setError('Failed to fetch rentals');
      }
    };
  
    fetchRentals();
  }, []);   

  const handleEdit = (rentalId: string) => {
    navigate(`/edit-rental/${rentalId}`);
  };

  return (
    <div>
      <h1>Rentals</h1>
      {error && <div className="error">{error}</div>}
      <AddRental userId={userId || ''} />
      <div className="rental-list">
        {rentals.map((rental) => (
          <div className="rental-card" key={rental._id}>
            <h2>{rental.name}</h2>
            <p>Type: {rental.type}</p>
            <p>Address: {rental.address}</p>
            <p>Availability: {rental.availability ? 'Available' : 'Not Available'}</p>
            <p>Price: ${rental.price}</p>
            <p>Description: {rental.description}</p>
            {rental.owner === userId && (
              <button onClick={() => handleEdit(rental._id)}>Edit</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
