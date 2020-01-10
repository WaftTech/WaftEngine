FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENV PORT 5051

EXPOSE 5051

RUN npm run build
CMD ["node", "server"]
