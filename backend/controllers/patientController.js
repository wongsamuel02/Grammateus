const Patient = require('../model/Patient');

// Example: Create a new Patient
const createPatient = async (req, res) => {
    const { firstName, lastName, dob, gender, phoneNumber, email } = req.body
    
    if (!firstName || !lastName || !dob || !gender || !phoneNumber || !email) {
        return res.status(400).json({ error: "All fields are required: firstName, lastName, dob, gender, phoneNumber, email" });
    }
    
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
        return res.status(400).json({ error: "firstName and lastName must be strings" });
    }
    
    if (typeof phoneNumber !== 'string' || !/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ error: "phoneNumber must be a valid 10-digit phone number as a string" });
    }
    
    if (typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: "email must be a valid email address" });
    }
    
    if (gender !== 'Male' && gender !== 'Female') {
        return res.status(400).json({ error: "gender must be either 'Male' or 'Female'" });
    }
    
    if (isNaN(Date.parse(dob))) {
        return res.status(400).json({ error: "dob must be a valid date" });
    }
    
    try {
        const patientData = {
            firstName,
            lastName,
            dob,
            gender,
            phoneNumber,
            email,
        };

        const newPatient = new Patient(patientData);

        // Save the new patient to the database
        const savedPatient = await newPatient.save();
        return res.status(201).json(savedPatient); // Return the created patient
    } catch (err) {
        console.error("Error creating Patient:", err);
        return res.status(500).json({ error: "Error creating patient, please try again later" });
    }
}

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();

        if (!patients) {
            return res.status(404).json({ error: "Patients not found" });
        }

        return res.status(200).json(patients)
    } catch (err) {
        console.error("Error getting patients:", err);
        return res.status(500).json({ error: "Error getting patients, please try again later" });
    }
}

const getPatient = async (req, res) => {
    const { email, phoneNumber } = req.body

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: "Either email or phoneNumber required"})
    }

    try {
        const patient = await Patient.findOne({ $or: [{ email }, { phoneNumber }] });

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        return res.status(200).json(patient)
    } catch (err) {
        console.error("Error getting patient:", err);
        return res.status(500).json({ error: "Error getting patient, please try again later" });
    }
}

const modifyPatientInfo = async (req, res) => {
    const { email, phoneNumber, newFirstName, newLastName, newDob, newGender, newPhoneNumber, newEmail } = req.body

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: "Either email or phoneNumber required"})
    }

    const updateFields = {};

    if (newFirstName) {
        updateFields.firstName = newFirstName;
    }

    if (newLastName) {
        updateFields.lastName = newLastName;
    }

    if (newDob) {
        updateFields.dob = newDob;
    }

    if (newGender) {
        updateFields.gender = newGender;
    }

    if (newPhoneNumber) {
        updateFields.phoneNumber = newPhoneNumber;
    }

    if (newEmail) {
        updateFields.email = newEmail;
    }

    try {
        const updatedPatient = await Patient.updateOne(
            { $or: [{ email }, { phoneNumber }] },
            { $set: updateFields }
        );
    
        if (updatedPatient.matchedCount === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }
    
        return res.status(200).json({ message: "Patient updated successfully" });
    } catch (err) {
        console.error("Error updating patient:", err);
        return res.status(500).json({ error: "Error updating patient" });
    }
}

const searchPatient = async (req, res) => {
    try {
        const query = req.query.q || '';
        const patients = await Patient.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } }
            ]
        }).limit(10); // Case-insensitive search
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = { createPatient, getAllPatients, getPatient, modifyPatientInfo, searchPatient };