// DB setup
const connectToMongoDB = require('./database');
connectToMongoDB();

const app = require('./app');  // Import the app from app.js

const port = 8000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});