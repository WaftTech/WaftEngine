FROM node:latest
RUN npm install -g nodemon
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENV PORT 5050

EXPOSE 5050

CMD ["node", "index.js"]
