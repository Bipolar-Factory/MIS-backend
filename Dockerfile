FROM node:12-alpine
RUN npm i -g nodemon
RUN mkdir /mis-api
WORKDIR /mis-api
COPY package.json /mis-api
COPY package-lock.json /mis-api
RUN npm i
COPY . /mis-api
EXPOSE 5000
CMD [ "npm", "start" ]