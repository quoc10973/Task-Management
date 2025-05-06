# Use Node.js image as the base image
FROM node:18-alpine

# Install libraries and dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code into the container
COPY . .

# Build the NestJS source code
RUN npm run build

# Configure environment variables (if needed)
# ENV NODE_ENV=production

# No need to expose a port because the service only communicates via RabbitMQ
# CMD ["npm", "run", "start:prod"]
# However, if you need to expose a port (for example: for HTTP or debugging), you can open a port as follows:
# EXPOSE 3001

# Start the Mail-Sender application
CMD ["npm", "run", "start:prod"]
