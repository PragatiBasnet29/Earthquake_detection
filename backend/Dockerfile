# ─── Earthquake Alert System – Backend ────────────────────────────────────────
# Node.js / Express + SQLite
FROM node:18-alpine

# sqlite3 needs native build tools on Alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package.json package-lock.json ./

# Install production dependencies (sqlite3 will be compiled here)
RUN npm ci --omit=dev

# Copy application source
COPY . .

EXPOSE 5000

# Health check so docker-compose knows when the service is ready
HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=5 \
  CMD wget -qO- http://localhost:5000/status || exit 1

CMD ["node", "app.js"]
