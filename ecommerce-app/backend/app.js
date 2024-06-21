require('dotenv').config();
const express = require("express");
const collection = require("./mongo");
const Rental = require("./Rental");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticateJWT = require('./authMiddleware');

const app = express();
const PORT = 8000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email, password });

        if (user) {
            const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);
            res.json({ token });
        } else {
            res.json("not exist");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Internal server error");
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await collection.findOne({ email });

        if (userExists) {
            res.status(409).json("User already exists");
        } else {
            const newUser = new collection({ email, password });
            await newUser.save();
            res.json("User registered successfully");
        }
    } catch (e) {
        console.error("Error during signup:", e);
        res.status(500).json("Internal server error");
    }
});

app.get("/rentals", authenticateJWT, async (req, res) => {
    try {
        const rentals = await Rental.find();
        res.json(rentals);
    } catch (e) {
        console.error("Error fetching rentals:", e);
        res.status(500).json("Internal server error");
    }
});

app.post("/add-rental", authenticateJWT, async (req, res) => {
    const { name, type, address, availability, price, description } = req.body;

    try {
        const newRental = new Rental({
            name, type, address, availability, price, description, owner: req.user.userId
        });
        await newRental.save();
        res.json("Rental added successfully");
    } catch (e) {
        console.error("Error adding rental:", e);
        res.status(500).json("Internal server error");
    }
});
app.get('/rentals/:id', authenticateJWT, async (req, res) => {
    try {
      const rental = await Rental.findById(req.params.id);
      if (!rental) {
        return res.status(404).send('Rental not found');
      }
      res.json(rental);
    } catch (error) {
      console.error('Error fetching rental:', error);
      res.status(500).json('Internal server error');
    }
  });
  
  // Update a rental by ID
  app.put('/rentals/:id', authenticateJWT, async (req, res) => {
    const { name, type, address, availability, price, description } = req.body;
  
    try {
      const rental = await Rental.findById(req.params.id);
  
      if (!rental) {
        return res.status(404).send('Rental not found');
      }
  
      if (rental.owner.toString() !== req.user.userId) {
        return res.status(403).send('Unauthorized');
      }
  
      rental.name = name;
      rental.type = type;
      rental.address = address;
      rental.availability = availability;
      rental.price = price;
      rental.description = description;
  
      await rental.save();
      res.json('Rental updated successfully');
    } catch (error) {
      console.error('Error updating rental:', error);
      res.status(500).json('Internal server error');
    }
  });
  
  // Existing routes
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

