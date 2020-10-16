const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Menu = Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Menu", Menu);