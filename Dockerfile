FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install ; npm install dateformat ; mkdir -p /data
COPY . .
EXPOSE 8001
CMD [ "npm", "start" ]1
