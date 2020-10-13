const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Customer = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Customer", Customer);