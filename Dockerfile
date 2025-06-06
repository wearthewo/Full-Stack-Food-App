# ====== Stage 1: Build Frontend ======
FROM node:18 AS frontend

# Set working directory inside the container
WORKDIR /app/frontend

# Copy only package files and install dependencies first (better cache)
COPY frontend/package*.json ./
RUN npm install

# ✅ Copy entire frontend source including index.html and src/
COPY frontend/ .

# Optional: Copy env if you use .env for Vite at build time
COPY frontend/.env .env

# Run Vite build
RUN npm run build


# ====== Stage 2: Backend ======
FROM node:18 AS backend

# Working directory for backend
WORKDIR /app

# Copy backend package files and install deps
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ .

#  Copy frontend build output into public folder served by Express
COPY --from=frontend /app/frontend/dist ./public

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]
