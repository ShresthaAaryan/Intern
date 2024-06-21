import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../stories/Button";
import "../App.css";

interface AddRentalProps {
  userId?: string; // Make userId optional
}

const AddRental: React.FC<AddRentalProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [rental, setRental] = useState({
    name: "",
    type: "",
    address: "",
    availability: false,
    price: 0,
    description: "",
    owner: userId?.toString() || "", // Use optional chaining and default to empty string
  });
  const [error, setError] = useState("");

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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post("http://localhost:8000/add-rental", rental, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Add Rental Response:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error adding rental:", error);
      setError("Failed to add rental. Please try again.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="flex-column">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={rental.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-column">
        <label>Type</label>
        <select name="type" value={rental.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="hotel">Hotel</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
      </div>
      <div className="flex-column">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={rental.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-column">
        <label>Availability</label>
        <input
          type="checkbox"
          name="availability"
          checked={rental.availability}
          onChange={handleAvailabilityChange}
        />
      </div>
      <div className="flex-column">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={rental.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex-column">
        <label>Description</label>
        <textarea
          name="description"
          value={rental.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      {error && <div className="error">{error}</div>}
      <Button label="Add Rental" primary className="button-submit" />
    </form>
  );
};

export default AddRental;
