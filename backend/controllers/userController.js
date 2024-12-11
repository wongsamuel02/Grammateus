const Users = require('../model/Users');

// Example: Create a new user
const createUserInDB  = async (firstName, lastName, email, password, optionalParams = {}) => {
    try {
        const newUser = await Users.create({
            firstName: firstName,
            lastName: lastName,
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

const getUser = async (email) => {
    if(!email) {
        throw new Error('Email is required');
    }
    try {
        const user = await Users.findOne({ email: email }); // Query to find a user with the given email
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { createUserInDB, getUser };