const jwt = require('jsonwebtoken');
const Users = require('../model/Users')
const { generateAccessToken } = require('../utils/generateJWT');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt

    const foundUser = await Users.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // evaulate JWT
    jwt.verify(refreshToken, 
        process.env.refresh_token_secret, 
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles)
            const accessTokenInfo = {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            };
            const accessToken = generateAccessToken(accessTokenInfo)
            res.status(200).json({ roles, accessToken})
        }
    );
}

module.exports = { handleRefreshToken }