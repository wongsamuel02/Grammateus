const express = require('express');
const multer = require('multer');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
require('dotenv').config();

// Express setup
const app = express();
const port = 8000;

// Multer setup for file upload handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// OpenAI setup
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Whisper API (assuming you're using Whisper API hosted elsewhere or Whisper.cpp integration)
const WHISPER_API_URL = 'https://api.whisper.com/v1/transcribe'; // Replace with the actual Whisper API URL

// Endpoint to handle audio file upload and processing
app.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        const audioPath = req.file.path;

        // Send audio file to Whisper API for transcription
        const whisperResponse = await axios.post(WHISPER_API_URL, {
            audio_file: fs.createReadStream(audioPath)
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const transcription = whisperResponse.data.text;

        // Use OpenAI API to convert transcription to patient notes
        const gptResponse = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a medical assistant. Convert the following doctor-patient conversation into concise patient notes from the doctor's perspective"
                },
                {
                    role: "user",
                    content: transcription
                }
            ]
        });

        const patientNotes = gptResponse.data.choices[0].message.content;

        // Send the notes back as the API response
        res.status(200).json({
            transcription: transcription,
            patientNotes: patientNotes
        });

        // Cleanup uploaded audio file
        fs.unlinkSync(audioPath);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the audio file or generating patient notes.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
