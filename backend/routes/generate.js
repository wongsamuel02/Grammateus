const express = require('express');
const { generatePatientNotes } = require('../controllers/generateController');  // Import the controller

const router = express.Router();

// POST route to get patient notes from OpenAI
router.post('/', async (req, res) => {
    try {
        const { originalText } = req.body;

        // Use the controller function to generate patient notes
        const PatientNotes = await generatePatientNotes(originalText);

        res.json({ PatientNotes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
