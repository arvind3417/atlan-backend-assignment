# Dockerfile for Main Application
FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:dev"]
