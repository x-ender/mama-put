const express = require('express');

// Init express
const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Homepage Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// App listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));