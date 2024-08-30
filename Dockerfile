# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:20.16.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY . .

# Install Node.js dependencies using Yarn
RUN yarn install --network-timeout 100000

# Build the Next.js application
RUN NODE_OPTIONS=--max-old-space-size=8192 npm run build

# Expose the port that your Next.js app will run on (usually 3000)
EXPOSE 3000

# Define the command to start your Next.js app
CMD ["yarn", "start"]
