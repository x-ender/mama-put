const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    ready: {
        type: Boolean,
        required: true,
    },
    pickupTime: {
        type: Date,
        required: true,
    },
    payOnPickup: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("Order", Order);