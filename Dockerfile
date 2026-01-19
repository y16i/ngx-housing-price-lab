# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build the Angular application
RUN npm run build

# Runtime stage
FROM node:20-alpine

ARG API_URL=http://localhost:3000/api/houses

WORKDIR /app

# Install http-server globally to serve static files
RUN npm install -g http-server

# Copy built application from builder stage
COPY --from=builder /app/dist/ngx-housing-price-lab/browser ./dist

# Expose port 8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Create config.json with API_URL
RUN echo '{"apiUrl": "'${API_URL}'"}' > dist/config.json

# Start http-server to serve the built application
CMD ["http-server", "dist", "-p", "8080", "--gzip"]
