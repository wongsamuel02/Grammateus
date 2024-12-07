const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Users', // Reference to the Users collection
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient collection
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    transcriptData: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Visit', visitSchema);
