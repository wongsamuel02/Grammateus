# Use an official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install
RUN npm i react-router-dom@6.26.2


# Expose the app port
EXPOSE 3000


