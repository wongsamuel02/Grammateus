const jwt = require('jsonwebtoken');
require('dotenv').config();
const { generateAccessToken } = require('../utils/generateJWT');

// Test db
const usersDB = [
    { email: "testuser@gmail.com", password: "testpass"}
];
//

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' })
}

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    const foundUser = usersDB.find(person => person.refreshToken === refreshToken);

    if (!foundUser) return res.sendStatus(403); // Forbidden

    // evaulate JWT
    jwt.verify(refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err | foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = generateAccessToken(decoded.email)
        })
    res.json({ 'accessToken': accessToken})
}

module.exports = { handleRefreshToken }