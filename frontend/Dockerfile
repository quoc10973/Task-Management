# Use Node.js image as the base image for building the app
FROM node:20-alpine AS builder

# Install libraries and dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code into the container
COPY . .

# Build the Vite application
RUN npm run build

# Use a minimal Node.js image to serve the app
FROM node:20-alpine

# Set the working directory for the application
WORKDIR /app

# Copy the build folder from the builder stage
COPY --from=builder /app/dist /app/dist

# Install a simple static server (like serve)
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the Vite application
CMD ["serve", "-s", "dist", "-l", "3000"]
