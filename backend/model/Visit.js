const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    doctor: {
        type: String,
        ref: 'Users', // Reference to the Users collection
        required: true
    },
    patient: {
        type: String,
        ref: 'Patient', // Reference to the Patient collection
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // Minutes
        required: true
    },
    transcriptData: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Visit', visitSchema);
