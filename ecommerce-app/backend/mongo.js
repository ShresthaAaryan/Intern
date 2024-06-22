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
    }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
