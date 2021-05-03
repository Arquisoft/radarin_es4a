# pull official base image
FROM node:12.14.1

# set working directory
WORKDIR /app
COPY . ./

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI

RUN npm install -g serve
RUN npm install

RUN npm run build

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#Install software neccesary for generating the doc
RUN apt-get update && apt-get -y install ruby openjdk-8-jre
RUN gem install asciidoctor asciidoctor-diagram
RUN npm install shx --save-dev

#generate the doc
RUN npm run docs

# start app
RUN chmod +x start.sh
CMD ["./start.sh"]
