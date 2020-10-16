const express = require('express');
const connection = require('./database');
const customerRoute = require("./routes/api/customer");
const menuRoute = require("./routes/api/menu");

// Init express
const app = express();
// PORT
const PORT = process.env.PORT || 5000;

// Establishing Connection
connection.once('open', () => {
    console.log("Mongodb connected");
})


//Middleware
app.use(express.json());
app.use('/api/customer', customerRoute);
app.use('/api/menu', menuRoute);

// Homepage Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// App listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
