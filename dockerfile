FROM node:20-alpine

RUN mkdir -p /home/client
WORKDIR /home/client

COPY build ./build
RUN npm i -g serve

EXPOSE 3000
CMD [ "serve", "-s", "build"]