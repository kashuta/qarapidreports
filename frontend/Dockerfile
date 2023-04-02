FROM node:18.15

WORKDIR /app/frontend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
