const Visit = require('./models/Visit');
const User = require('./models/Users');
const Patient = require('./models/Patient');

// Example: Creating a new visit
async function createVisit(doctorId, patientId, duration, transcriptData) {
    try {
        const newVisit = new Visit({
            doctor: doctorId,
            patient: patientId,
            duration: duration,
            transcriptData: transcriptData
        });
        await newVisit.save();
        console.log('Visit created successfully:', newVisit);
    } catch (error) {
        console.error('Error creating visit:', error);
    }
}
