const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [itemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('order', orderSchema, 'Orders');

module.exports = Order;