const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Function to generate patient notes using OpenAI API
 * @param {string} originalText - The original script
 * @returns {Promise<string>} - The patient notes from OpenAI
 */
const generatePatientNotes = async (originalText) => {
    const prePrompt = `Please use this transcription of a patient-doctor interaction to generate organized patient notes.
                     This text was generated by a speech-to-text model:\n\n"${originalText}"`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [{ role: 'user', content: prePrompt }],
    });

    // Return the patient notes
    return response.choices[0].message.content.trim();
};

module.exports = { generatePatientNotes };
