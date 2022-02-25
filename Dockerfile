FROM node:12
LABEL version="1.0" 
LABEL author="basiljereh@gmail.com"
WORKDIR /farasi-rides-websocket-002
COPY package.json /app
RUN npm install
COPY . /farasi-rides-websocket-002
ENV NODE_MONGO_POLLER_INTERVAL=10000
ENV TZ=Africa/Nairobi 
CMD node index.js
EXPOSE 30100
