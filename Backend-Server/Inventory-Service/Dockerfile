# Use an official Node.js runtime as the base image
FROM node:14.16.0-alpine3.13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app is listening on
EXPOSE 6000

# Start the app
CMD ["node", "app.js"]