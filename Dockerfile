FROM node:21-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm ci

EXPOSE 3001

#ENTRYPOINT node ./url-shorter/app.js
CMD ["node", "./url-shorter/src/app.js"]
