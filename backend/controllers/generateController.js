const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Function to anonymize transcription by replacing PII with tags
 * @param {string} originalText - The original transcription
 * @returns {Promise<string>} - The anonymized transcription
 */
const anonymizeTranscription = async (originalText) => {
    const piiPrompt = `Please replace all Personally Identifiable Information (PII) in the following text with appropriate tags. 
    For example:
    - Replace names with 'patient_name'
    - Replace dates with 'patient_date'
    - Replace locations with 'patient_location'
    - Replace specific numbers (like age) with 'patient_age'
    - Replace any other PII with relevant tags.
    Keep the rest of the transcription as is. Here is the text:
    \n\n"${originalText}"`;

    // Call OpenAI API to anonymize transcription
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [{ role: 'user', content: piiPrompt }],
    });

    return response.choices[0].message.content.trim();
};

/**
 * Function to generate patient notes using OpenAI API
 * @param {string} stippedTest - The PII-stripped transcription
 * @returns {Promise<string>} - The patient notes from OpenAI
 */
const generatePatientNotes = async (strippedText) => {
    const prePrompt = `Please use this transcription of a patient-doctor interaction to generate organized patient notes. First you should refine this text, then generate the organized patient notes based on the refined text. The organized patient notes MUST follow this structure:
    Subjective (S): Include the patient's chief complaint, history of present illness, past medical history, and any relevant social/family history or review of systems mentioned in the conversation.
    Objective (O): Extract any physical exam findings, lab results, imaging, or other objective data that the doctor discusses.
    Assessment (A): Summarize the doctor's assessment, including the diagnosis or possible differential diagnoses.
    Plan (P): Detail the treatment plan, any follow-up instructions, and patient education provided by the doctor. Please do not include any other text, and just directly give me these organized patient notes in bullet point format. 
    The example has ended, only add newlines to separate each of the described sections above, otherwise do not add any newline character.
    Here is the transcription:
    \n\n"${strippedText}"`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [{ role: 'user', content: prePrompt }],
    });

    // Return the patient notes
    return response.choices[0].message.content.trim();
};

module.exports = { anonymizeTranscription, generatePatientNotes };
