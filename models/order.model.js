const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = Schema({
    orderItemNames: {
        type: Array,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
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