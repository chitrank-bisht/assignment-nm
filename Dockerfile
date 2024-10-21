FROM node:20.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && node ./dist/server.js"]
