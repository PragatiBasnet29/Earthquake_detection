# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies (using --legacy-peer-deps for compatibility)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the production bundle
RUN npm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.25-alpine AS production

# Remove default Nginx site files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from Stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration for proxying /api
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
