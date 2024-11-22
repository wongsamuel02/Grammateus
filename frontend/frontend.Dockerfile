# Use an official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY . .

RUN chmod +x frontend_install_dependencies.sh

# Run the install script
RUN ./frontend_install_dependencies.sh



# Expose the app port
EXPOSE 3000

CMD ["npm", "start"]


