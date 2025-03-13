FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache docker-cli

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install
# RUN npm install nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your backend application will run
EXPOSE 8080

# Start the backend application
CMD ["npm", "start"]