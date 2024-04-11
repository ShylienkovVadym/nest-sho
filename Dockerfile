ARG NODE_VERSION=18.13.0
FROM node:${NODE_VERSION}-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start:dev"]
