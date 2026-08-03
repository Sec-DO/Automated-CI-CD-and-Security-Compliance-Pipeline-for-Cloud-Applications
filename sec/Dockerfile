# ==========================================
# Stage 1: Build Vite Production Assets
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (ci for deterministic builds)
RUN npm ci

# Copy source code
COPY . .

# Build production bundle
RUN npx vite build

# ==========================================
# Stage 2: Serve via Hardened Nginx
# ==========================================
FROM nginx:alpine-slim

# Copy custom security-hardened nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Health check to ensure container readiness
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
