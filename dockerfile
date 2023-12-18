FROM node:21.1.0
WORKDIR /usr/src/app
COPY . .
RUN npm install 
RUN npm run build
EXPOSE 3000
ENTRYPOINT npm start
