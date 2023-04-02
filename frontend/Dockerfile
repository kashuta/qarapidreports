# Build stage
FROM node:18.15-alpine as build

WORKDIR /frontend

COPY ./frontend/package*.json ./frontend/package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

# Runtime stage
FROM node:18.15-alpine

WORKDIR /frontend

# Install 'serve' to serve the production build
RUN npm install -g serve

# Copy the production build from the build stage
COPY --from=build /frontend/build /frontend/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
