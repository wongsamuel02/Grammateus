const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
require('dotenv').config();

// Express setup
const app = express();
const port = 8000;

// Middleware
app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(400).json({ message: "Invalid JSON format" });
            throw new Error('Invalid JSON');
        }
    }
}));
app.use(cors());
app.use(cookieParser());

// DB setup
const connectToMongoDB = require('./database');
connectToMongoDB();

// routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))
app.use('/gpt', require('./routes/generate'))

// Restricted Routes
app.use(verifyJWT)

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
