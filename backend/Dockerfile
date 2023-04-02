# Build stage
FROM node:18.15-alpine as build

WORKDIR /app/backend

COPY package*.json ./

RUN npm ci

COPY . .

# Runtime stage
FROM node:18.15-alpine

WORKDIR /app/backend

# Copy only the production dependencies and the built application from the build stage
COPY --from=build /app/backend/node_modules /app/backend/node_modules
COPY --from=build /app/backend/package*.json /app/backend/
COPY --from=build /app/backend/ /app/backend/

EXPOSE 3001

CMD ["npm", "start"]
