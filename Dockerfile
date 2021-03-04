FROM node:14.15.4

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . . 

RUN npm install -g sequelize-cli

EXPOSE 3000

CMD ["npm","start"]