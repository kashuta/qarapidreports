# Build stage
FROM node:18.15-alpine as build

WORKDIR /backend

COPY package*.json package-lock.json* ./

RUN npm install

COPY . .

# Runtime stage
FROM node:18.15-alpine

WORKDIR /backend

# Copy only the production dependencies and the built application from the build stage
COPY --from=build /backend/node_modules /backend/node_modules
COPY --from=build /backend/package*.json /backend/
COPY --from=build /backend/ /backend/

EXPOSE 3001

CMD ["npm", "start"]
