const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
