FROM node:18.4-alpine

WORKDIR /src
ADD package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npx typeorm migration:revert -d dist/modules/config/dataProvider.js
RUN npx typeorm migration:run -d dist/modules/config/dataProvider.js

CMD ["npm", "run", "start:prod"]
