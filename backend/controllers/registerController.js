const { createUserInDB  } = require('./userController');
const Users = require('../model/Users')
const bcrpty = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': "Email and password are required"})

    // Check for duplicate emails in the db
    const duplicate = await Users.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // encrypt password
        const hashedPassword = await bcrpty.hash(password, 10)
        
        // Create and Store user in DB
        const result = createUserInDB(email, hashedPassword)

        console.log(result);

        res.status(201).json({ 'success': `New user ${email} created!`})
        //
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewUser }