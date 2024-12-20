const Visit = require('../model/Visit');
const User = require('../model/Users');
const Patient = require('../model/Patient');
const { getUser } = require('../controllers/userController');
const { getPatient } = require('../controllers/patientController');
const { generate } = require('../routes/generate')

const createVisit = async (req, res) => {
    const { doctorEmail, patientEmail, duration, originalText } = req.body;
    if (!doctorEmail && !patientEmail && !duration && !originalText) return res.status(400).json({ 'message': 'doctorEmail, patientEmail, duration, transcriptionData not in req' })
    
    try {
        const data = await generate(originalText);
        const formattedScript = data.formattedScript;
        const parsedRecord = data.parsedRecord; 

        const doctor = await getUser(doctorEmail);
        const patient = await getPatient(patientEmail);

        if (!doctor) {
            return res.status(404).json({ message: `Doctor with email ${doctorEmail} not found.` });
        }
        if (!patient) {
            return res.status(404).json({ message: `Patient with email ${patientEmail} not found.` });
        }

        const newVisit = new Visit({
            doctor: doctor._id,
            patient: patient._id,
            date: Date(),
            duration: duration,
            transcriptData: formattedScript,  
        });

        await newVisit.save();
        res.status(201).json(parsedRecord);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating visit', error: error.message });
    }
}

const getAllVisitsByPatient = async (req, res) => {
    const { email: patientEmail } = req.query;
    if (!patientEmail) return res.status(400).json({ 'message': 'patient email required' })
    
    try {
        const patient = await getPatient(patientEmail);
        if (!patient) {
            return res.status(404).json({ message: `Patient with email ${patientEmail} not found.` });
        }

        const visits = await Visit.find({ patient: patient._id })
            .populate('doctor', 'firstName lastName email')
            .populate('patient');
        return res.status(200).json(visits);
    } catch (error) {
        console.error('Error fetching visits:', error);
        throw new Error('Unable to fetch visits.');
    }
};

const getAllVisitsByDoctor = async (req, res) => {
    const { email: doctorEmail } = req.query;
    if (!doctorEmail) return res.status(400).json({ 'message': 'doctor email required' })

    try {
        const doctor = await getUser(doctorEmail);
        if (!doctor) {
            return res.status(404).json({ message: `Doctor with email ${doctorEmail} not found.` });
        }

        const visits = await Visit.find({ doctor: doctor._id })
            .populate('doctor', 'firstName lastName email')
            .populate('patient')
            .sort({ date: -1 }) // Sort by date in descending order (most recent first)
            .exec();
        return res.status(200).json(visits);
    } catch (error) {
        console.error('Error fetching visits:', error);
        throw new Error('Unable to fetch visits');
    }
}

module.exports = { createVisit, getAllVisitsByPatient, getAllVisitsByDoctor }