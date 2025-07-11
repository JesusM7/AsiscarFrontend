# Multi-stage build for React + Vite app
# Stage 1: Build the application
FROM node:20-alpine as build
ARG VITE_API_URL
# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm ci

# Install the musl-compatible Rollup binary for Alpine Linux
RUN npm install @rollup/rollup-linux-x64-musl

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine
ARG VITE_API_URL

# Create a non-root user
RUN adduser -D appuser

# Set working directory
WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist .

# Install serve package globally
RUN npm install -g serve

# Switch to non-root user
USER appuser

# Expose port 3000 (serve's default port)
EXPOSE 3000

# Start serve
CMD ["serve", "-s", "."]
