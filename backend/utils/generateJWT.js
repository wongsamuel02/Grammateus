const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.access_token_secret, { expiresIn: '5m' })
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.refresh_token_secret, { expiresIn: '15m' })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}