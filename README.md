# Grammateus – AI-Driven Medical Scribe and Assistant
Grammateus is an innovative AI-powered web application designed to reduce the administrative burden in healthcare settings. By leveraging advanced speech recognition and natural language processing technologies, Grammateus transcribes, interprets, and summarizes patient-doctor interactions in real-time, significantly reducing the time and effort healthcare professionals spend on documentation.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Versioning](#versioning)
- [Documentation Links](#documentation-links)
- [Contributers](#Contributers)

## Features
- **Automatic Transcription**: Transcribe patient-doctor interactions using Google Speech-to-Text.
- **AI-Driven Summarization**: Summarize conversations into concise notes with OpenAI's GPT.
- **HIPAA-Compliant Data Handling**: Securely store and anonymize patient information.
- **Time Tracking**: Track consultation durations for accurate billing.

## Installation
### Requirements
- Node.js, Docker, kubectl, and Google Cloud CLI.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Grammateus.git
   cd Grammateus

2. Set up environment variables by creating a .env file with necessary API keys.
3. Build and run with Docker:
   ```bash
   docker-compose up

## Deployment
### Our project is deployed on Google Cloud Platform using Kubernetes (GKE):
- Docker images are built and stored in Google Artifact Registry.
- Kubernetes configurations are applied using `kubectl` for managing deployments and services.

## Usage
- Access the frontend at `[LoadBalancer IP]:[Port]`.
- **Key API Routes**:
    - `/generate`: Generate patient notes from transcription text.

## Versioning
### Current version: 1.0.0
- The current version is shown in the frontend footer or can be found on GitHub via "Releases"

## Documentation Links
- [User Manual](https://link-url-here.org)

## Contributers
- [Andy Lam](https://github.com/andylam20), Student @ Purdue University
- [Parthiv Patel](https://github.com/parpat04), Student @ Purdue University
- [Samuel Wong](https://github.com/wongsamuel02), Student @ Purdue University


