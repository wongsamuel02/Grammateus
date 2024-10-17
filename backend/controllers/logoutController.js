const Users = require('../model/Users')
const { generateAccessToken } = require('../utils/generateJWT');

const handleLogout = async (req, res) => {
    // On client also delete the accessToken

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt

    // Check if refreshToken in DB
    const foundUser = await Users.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204); // Successful, No content
    }

    // Delete refreshToken from db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }