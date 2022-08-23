FROM node:18.4-alpine

WORKDIR /src
ADD package*.json ./
RUN npm install

COPY . .

RUN npm run build
CMD ["npm", "run", "start"]
