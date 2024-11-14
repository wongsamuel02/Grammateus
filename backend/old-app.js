// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const axios = require('axios');
// const { OpenAIApi } = require('openai');
// const fs = require('fs');
// require('dotenv').config();

// const connectToMongoDB = require('./database');

// // Express setup
// const app = express();
// const port = 8000;

// connectToMongoDB();


// const openai = new OpenAIApi({
//     api_key: process.env.OPENAI_API_KEY
//   });

// // Use OpenAI API to convert transcription to patient notes
// async function generatePatientNotes() {
//     try {
//         const gptResponse = await openai.createChatCompletion({
//             model: "gpt-4o-mini",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are a medical assistant. Convert the following doctor-patient conversation into concise patient notes from the doctor's perspective"
//                 },
//                 {
//                     role: "user",
//                     content: "Hello, how are you, I'm Dr. Dre. Hello, I'm having foot pain and my knee is swollen. Okay, lemme take a look and run an ROM test. Let me know when it starts to hurt. Okay, stop it hurts there. Patient has severly limited ROM on left patellar."
//                 }
//             ]
//         });
//         console.log(gptResponse.data.choices[0].message.content);
//     } catch (error) {
//         console.error("Error generating patient notes:", error);
//     }
// }


// (function () {
//     generatePatientNotes();
//   })();

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
