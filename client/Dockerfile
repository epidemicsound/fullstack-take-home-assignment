# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /code

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install
# If you use Yarn, replace the previous line with the following:
# RUN yarn

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build
# If you use Yarn, replace the previous line with the following:
# RUN yarn build

# Install a lightweight web server to serve the built React app
RUN npm install -g serve

# Set the command to run when the container starts
CMD ["serve", "-s", "build"]

# Expose the port the app will run on (usually port 5000 for serve)
EXPOSE 3000
