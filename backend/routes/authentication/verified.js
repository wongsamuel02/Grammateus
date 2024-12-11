const express = require('express');
const Users = require('../../model/Users')
const router = express.Router();

router.get('/', async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt

    const foundUser = await Users.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    const email = foundUser.email

    return res.status(200).json({ email })
})

module.exports = router;