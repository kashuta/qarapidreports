FROM node:18.15

WORKDIR /app/backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
