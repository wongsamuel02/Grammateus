const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 0
        },
        Moderator: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('Users', usersSchema)