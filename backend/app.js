console.log("test0");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
require('dotenv').config();

console.log("initial");

// Express setup
const app = express();
console.log("Express initialized");

// Middleware
app.use(express.json({
    verify: (req, res, buf, encoding) => {
        console.log("Verifying JSON body");
        try {
            JSON.parse(buf);
        } catch (e) {
            console.log("Invalid JSON format");
            res.status(400).json({ message: "Invalid JSON format" });
            throw new Error('Invalid JSON');
        }
    }
}));

console.log("JSON middleware added");
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://34.57.143.34:32000', 'http://34.57.143.34:3000', 'https://grammateushealth.com/api', 'https://grammateushealth.com/api:3000', 'https://grammateushealth.com', 'https://grammateushealth.com/'];

const corsOptions = {
    origin: (origin, callback) => {
        console.log("Printing Origin:");
        console.log(origin);
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allows credentials to be sent
    optionsSuccessStatus: 200 // For legacy browsers
};
console.log("CORS options set");


app.use(cors(corsOptions));
console.log("CORS middleware added");

// Ensure Access-Control-Allow-Credentials is explicitly set
app.use((req, res, next) => {
    console.log("Setting Access-Control-Allow-Credentials header");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
console.log("Custom middleware for Access-Control-Allow-Credentials added");

app.use(cookieParser());
console.log("Cookie parser middleware added");

// routes
console.log("Adding public routes");
app.use('/api', require('./routes/root/root'))
app.use('/api/register', require('./routes/authentication/register'))
app.use('/api/auth', require('./routes/authentication/auth'))
app.use('/api/refresh', require('./routes/authentication/refresh'))
app.use('/api/logout', require('./routes/authentication/logout'))

// Restricted Routes
console.log("Adding restricted routes");
app.use(verifyJWT)
app.use('/api/isVerified', require('./routes/authentication/verified'))
app.use('/api/patient', require('./routes/patient/patient'))
app.use('/api/visit', require('./routes/visit'))
console.log("All routes added");

module.exports = app;
console.log("App module exported");
