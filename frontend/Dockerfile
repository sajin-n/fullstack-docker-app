# Use Node base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose React app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
