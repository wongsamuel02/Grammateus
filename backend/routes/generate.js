const express = require('express');
const { generatePatientNotes } = require('../controllers/generateController');  // Import the controller

const router = express.Router();

function parseMedicalRecord(input) {
    const sections = {
        subjective: [],
        objective: [],
        assessment: [],
        plan: []
    };

    // Trim input and replace newline characters for easier parsing
    const cleanedInput = input.replace(/\n/g, "").trim();

    // Define regular expressions to detect each section
    const subjectiveRegex = /Subjective \(S\):\s*(.*?)\s*Objective/;
    const objectiveRegex = /Objective \(O\):\s*(.*?)\s*Assessment/;
    const assessmentRegex = /Assessment \(A\):\s*(.*?)\s*Plan/;
    const planRegex = /Plan \(P\):\s*(.*)/;

    // Extract each section based on the patterns
    const subjectiveMatch = cleanedInput.match(subjectiveRegex);
    const objectiveMatch = cleanedInput.match(objectiveRegex);
    const assessmentMatch = cleanedInput.match(assessmentRegex);
    const planMatch = cleanedInput.match(planRegex);

    // Helper function to convert the matched string into a list by splitting on '-'
    const convertToList = (section) => {
        return section
            .split('-') // Split by the newline
            .map(item => item.trim()) // Trim each list item
            .filter(item => item.length > 0); // Filter out empty strings
    };

    // Assign the matched values to the corresponding sections, converting them into lists
    if (subjectiveMatch) sections.subjective = convertToList(subjectiveMatch[1]);
    if (objectiveMatch) sections.objective = convertToList(objectiveMatch[1]);
    if (assessmentMatch) sections.assessment = convertToList(assessmentMatch[1]);
    if (planMatch) sections.plan = convertToList(planMatch[1]);

    return sections;
}
// POST route to get patient notes from OpenAI
router.post('/', async (req, res) => {
    try {
        const { originalText } = req.body;
        
        // Use the controller function to generate patient notes
        const PatientNotes = await generatePatientNotes(originalText);

        const parsedRecord = parseMedicalRecord(PatientNotes);

        res.json({ parsedRecord });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
