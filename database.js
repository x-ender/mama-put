
const mongoose = require('mongoose');

// Init Mongoose for mongoDB
mongoose.connect('mongodb://localhost:27017/mamaput', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

module.exports = connection;