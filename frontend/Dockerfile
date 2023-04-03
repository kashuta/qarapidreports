# Build stage
FROM node:18.15-alpine as build

WORKDIR /app

COPY package*.json package-lock.json* ./

RUN npm install

COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

# Runtime stage
FROM node:18.15-alpine

WORKDIR /app/build

# Install 'serve' to serve the production build
RUN npm install -g serve

# Copy the production build from the build stage
COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "/app/build", "-l", "3000"]
