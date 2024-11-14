const express = require('express');
const authenticateToken = require('./middeware/authMiddleware.js')
const app = express();

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

// Test db
const users = [
    { id: 1, username: "testuser", password: "testpass"}
];
//

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' })
}

const authenticateUser = (username, password) => {
    if (!username || !password) {
        return { status: 400, message: "Username and password are required" };
    }

    const user = users.find(u => u.username === username);

    if (!user) {
        return { status: 401, message: "Invalid username or password" };
    }

    if (user.password !== password) {
        return { status: 401, message: "Invalid username or password"};
    } 

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1min' })

    return { status: 200, message: "Login successful", accessToken: accessToken };
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`)

    const result = authenticateUser(username, password)

    if (result.status !== 200) {
        return res.status(result.status).json({ message: result.message });
    }

    res.json({ message: result.message, accessToken: result.accessToken })
});

app.get('/secret', authenticateToken, (req, res) => {
    res.json({ message: "supper secret message" })
})

app.get('/authenticateToken', authenticateToken, (req, res) => {
    res.json({ message: "success" })
})

module.exports = app;