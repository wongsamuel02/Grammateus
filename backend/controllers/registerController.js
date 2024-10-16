const bcrpty = require('bcrypt');

// usersDB
const usersDB = [
    { email: "testuser@gmail.com", password: "testpass"}
];
//

const handleNewUser = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': "Email and password are required"})

    // Check for duplicate emails in the db
    const duplicate = usersDB.users.find(person => person.email === email);
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // encrypt password
        const hashedPwd = await bcrpty.hash(pwd, 10)
        
        // Store user in DB
        const newUser = { email: email, password: hashedPwd };
        usersDB.append(newUser)
        res.status(201).json({ 'success': `New user ${email} created!`})
        //
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewUser }