const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    imageURL: {
        type: String,
        default: "https://shorturl.at/ervxF"
    }
});

const model = mongoose.model("item", itemSchema, "Items");

module.exports = model;