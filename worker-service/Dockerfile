FROM node:18-alpine
RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 6000
CMD ["npm", "start"]
