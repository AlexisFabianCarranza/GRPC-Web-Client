FROM node:8

COPY ["./server", "/usr/src/"]

COPY ["./greeting.proto", "/usr/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 50051

CMD npm run dev