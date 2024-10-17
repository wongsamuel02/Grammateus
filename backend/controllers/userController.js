const Users = require('../model/Users');

// Example: Create a new user
const createUserInDB  = async (email, password, optionalParams = {}) => {
    try {
        const newUser = await Users.create({
            email: email,
            password: password,
            ...optionalParams
        });
        return newUser;
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
};

module.exports = { createUserInDB };