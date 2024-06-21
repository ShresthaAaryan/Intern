const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });
    
const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
