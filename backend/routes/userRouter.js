const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = express.Router();

const users = [
    { id: 1, username: "testuser", password: 'testpass'}
];

// Example route
router.get('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exist
    if (username != users.username || password != users.password) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ message: "Login successful", token });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // Store user info from the token payload
        next();
    });
}

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}. You have accessed a protected route.` });
});

module.exports = router;