# ==========================================
# Vanilla Secure Notes App - Dockerfile
# Pure HTML/CSS/JS served via Hardened Nginx
# ==========================================
FROM nginx:alpine-slim

# Copy custom security-hardened Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static web application files directly
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

# Expose standard HTTP port
EXPOSE 80

# Health check to ensure web server readiness
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
