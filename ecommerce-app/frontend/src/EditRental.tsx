// EditRental.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { useAuth } from './AuthContext';

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

const EditRental: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, userId } = useAuth();
  const [rental, setRental] = useState<Rental>({
    _id: '',
    name: '',
    type: '',
    address: '',
    availability: false,
    price: 0,
    description: '',
    owner: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await axios.get<Rental>(`http://localhost:8000/rentals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRental(response.data);
      } catch (error) {
        console.error('Error fetching rental:', error);
        setError('Failed to fetch rental');
      }
    };

    if (token) {
      fetchRental();
    }
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRental((prevRental) => ({ ...prevRental, [name]: value }));
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRental((prevRental) => ({
      ...prevRental,
      availability: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/rentals/${id}`, rental, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Edit Rental Response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error editing rental:', error);
      setError('Failed to edit rental. Please try again.');
    }
  };

  if (!userId || rental.owner !== userId) {
    // Redirect if not authorized to edit
    navigate('/home');
    return null;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="flex-column">
        <label>Name</label>

      </div>
      <div className="inputForm">
        <input
          type="text"
          name="name"
          value={rental.name}
          onChange={handleChange}
          className="input" 
          required
        />
      </div>
      <div className="flex-column">
        <label>Type</label>
      </div>
      <div className="inputForm">
        <select name="type" value={rental.type} onChange={handleChange} className="input"  required>
          <option value="">Select Type</option>
          <option value="hotel">Hotel</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
      </div>
      <div className="flex-column">
        <label>Address</label>

      </div>
      <div className="inputForm">
        <input
          type="text"
          name="address"
          value={rental.address}
          onChange={handleChange}
          className="input" 
          required
        />
      </div>
      <div className="flex-column">
        <label>Availability</label>

      </div>
      <div className="inputForm">
        <input
          type="checkbox"
          name="availability"
          checked={rental.availability}
          onChange={handleAvailabilityChange}
          className="input" 
        />
      </div>
      <div className="flex-column">
        <label>Price</label>

      </div>
      <div className="inputForm">
        <input
          type="number"
          name="price"
          value={rental.price}
          onChange={handleChange}
          className="input" 
          required
        />
      </div>
      <div className="flex-column">
        <label>Description</label>

      </div>
      <div className="inputForm">
        <textarea
          name="description"
          value={rental.description}
          onChange={handleChange}
          className="input" 
          required
        ></textarea>
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" className="button-submit">Save Changes</button>
    </form>
  );
};

export default EditRental;
