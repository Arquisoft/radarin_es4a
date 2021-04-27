# pull official base image
FROM node:12.14.1

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production

# add app
COPY . ./

RUN npm run build

# start app
CMD [ "node", "server.js" ]