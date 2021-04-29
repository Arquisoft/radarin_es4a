# pull official base image
FROM node:13.12.0

# set working directory
WORKDIR /app
COPY . ./

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install -g serve
RUN npm install

RUN npm run build

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ARG PORT=3000
ENV PORT=$PORT

# start app
CMD ["./start.sh"]
