# Stage 1: Build the React application
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the React app code into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration nginx personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]