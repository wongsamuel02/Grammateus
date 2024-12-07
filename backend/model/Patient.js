const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reasonOfVisitSchema = new Schema({
    reason: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: Date.now },
})

const patientSchema = new Schema({
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
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    reasonOfVisit: {
        type: [reasonOfVisitSchema],
        required: false,
    }
})

module.exports = mongoose.model("Patient", patientSchema);