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

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allows credentials to be sent
    optionsSuccessStatus: 200 // For legacy browsers
};

app.use(cors(corsOptions));

// Ensure Access-Control-Allow-Credentials is explicitly set
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

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
app.use('/logout', require('./routes/logout'))
app.use('/isVerified', require('./routes/verified'))

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
