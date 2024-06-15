const express = require("express");
const collection = require("./mongo");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Default route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email, password });

        if (user) {
            res.json("exist");
        } else {
            res.json("not exist");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Internal server error");
    }
});

// Signup route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await collection.findOne({ email });

        if (userExists) {
            res.json("Already exist");
        } else {
            const newUser = new collection({ email, password });
            await newUser.save();
            res.json("User registered successfully");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Internal server error");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
