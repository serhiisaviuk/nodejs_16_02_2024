FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm ci

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

CMD ["npm ", "run", "prod-migration"]
