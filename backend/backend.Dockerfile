# Base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

RUN chmod +x backend_install_dependencies.sh

# Run the install script
RUN ./backend_install_dependencies.sh

# Expose the port on which the app will run
EXPOSE 8000
