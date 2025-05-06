# Use Node.js as the base image
FROM node:20-alpine
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire source code into the container
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the port for the backend (usually 8080 for NestJS)
EXPOSE 8080

# Run the application when the container starts
CMD ["npm", "run", "start:prod"]
