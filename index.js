const express = require('express');
const mongoose = require('mongoose');
const customerRoute = require("./routes/api/customer");

// Init express
const app = express();
// PORT
const PORT = process.env.PORT || 5000;

// Init Mongoose for mongoDB
mongoose.connect('mongodb://localhost:27017/mamaput', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// Establishing Connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb connected");
})


//Middleware
app.use(express.json());
app.use('/customer', customerRoute);

// Homepage Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// App listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
