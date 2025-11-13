# Use a lightweight Node.js image
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose backend port
EXPOSE 5000

# Command to run backend
CMD ["npm", "start"]
