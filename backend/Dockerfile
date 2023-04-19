# Build stage
FROM node:18.15-alpine as build

WORKDIR /app

COPY package*.json package-lock.json* ./

RUN npm install

COPY . .

# Runtime stage
FROM node:18.15-alpine

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/
COPY --from=build /app/ /app/

EXPOSE 3001

CMD ["npm", "run", "start:dev-docker"]
