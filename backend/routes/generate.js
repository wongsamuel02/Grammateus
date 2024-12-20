const { anonymizeTranscription, formatToScript, generatePatientNotes } = require('../controllers/generateController'); // Import the controllers

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

const generate = async (originalText) => {
    try {
        // Step 1: Anonymize transcription
        const anonymizedText = await anonymizeTranscription(originalText);
        console.log("Anonymized Text:", anonymizedText); // Log anonymized text

        // Step 2: Generate formatted script from anonymized text
        const formattedScript = await formatToScript(anonymizedText);
        console.log("Formatted Text", formattedScript); // Log formatted script

        // Step 3: Generate patient notes from anonymized text
        const patientNotes = await generatePatientNotes(anonymizedText);

        // Step 4: Parse the patient notes
        const parsedRecord = parseMedicalRecord(patientNotes);

        return {formattedScript, parsedRecord};
    } catch (error) {
        throw new Error('Something went wrong during transcription processing');
    }
}

module.exports = { generate };
