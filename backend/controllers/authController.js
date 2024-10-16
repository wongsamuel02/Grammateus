const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateJWT');

// Test db
const usersDB = [
    { email: "testuser@gmail.com", password: "testpass"}
];
//

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`email: ${email}, Password: ${password}`)

    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    const foundUser = usersDB.find(u => u.email === email);

    if (!foundUser) return res.sendStatus(401) // Unauthorized

    // evaulate password
    // const match = await bcrypt.compare(pwd,  foundUser.password)
    const match = foundUser.password === password
    if (!match) return res.sendStatus(401);

    // Create JWTs
    const accessToken = generateAccessToken(foundUser)
    const refreshToken = generateRefreshToken(foundUser)

    // Saving refreshToken with current user to DB
    const otherUsers = usersDB.filter(person => person.email != foundUser.email)
    const currentUser = { ...foundUser, refreshToken };

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    return res.status(200).json({ 'success': `User ${email} is logged in`, 'accessToken': accessToken})
}

module.exports = { authenticateUser }