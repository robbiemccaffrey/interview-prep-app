# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install Chromium for prerendering
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/backend/package*.json ./packages/backend/
RUN npm ci
COPY . .
RUN npm run build --workspace=packages/frontend

# Production stage
FROM node:20-alpine
RUN npm install -g serve@14
WORKDIR /app
COPY --from=builder /app/packages/frontend/dist ./dist
EXPOSE 4010
CMD ["serve", "dist", "-l", "4010", "-c", "dist/serve.json"]
