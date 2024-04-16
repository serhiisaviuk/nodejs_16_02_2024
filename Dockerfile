FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm ci

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

#ENTRYPOINT node ./url-shorter/app.js
CMD ["npm", "run", "db:migration"]
CMD ["node", "./url-shorter/src/app.js"]
