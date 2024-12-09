const bcrypt = require('bcrypt')
const Users = require('../model/Users')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateJWT');

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    console.log(`email: ${email}, Password: ${password}`)

    const foundUser = await Users.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401) // Unauthorized

    // evaulate password
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.sendStatus(401);

    // Create JWTs
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessTokenInfo = {
        "UserInfo": {
            "email": foundUser.email,
            "roles": roles
        }
    };
    const accessToken = generateAccessToken(accessTokenInfo);
    
    const refreshTokenInfo = { "email": foundUser.email };
    const refreshToken = generateRefreshToken(refreshTokenInfo)

    // Saving refreshToken with current user to DB
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // send refreshToken with http-only
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).json({ 'success': `User ${email} is logged in`, 'accessToken': accessToken})
}

module.exports = { authenticateUser }