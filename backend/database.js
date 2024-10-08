const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// MongoDB connection options
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: true, // Enable SSL for secure connections
    // sslValidate: true, // Validate SSL certificates
    // sslCA: [fs.readFileSync('/path/to/ca.pem')]
};

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if MongoDB fails to connect
    }
};

// Export the connection function
module.exports = connectToMongoDB;
