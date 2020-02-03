FROM node:8

COPY [".", "/usr/src/"]

COPY ["./greeting.proto", "/usr/"]

WORKDIR /usr/src

RUN npm install

RUN npm install -g nodemon

EXPOSE 50051

CMD npm run dev