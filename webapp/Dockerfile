# pull official base image
FROM node:12.14.1

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
ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI

# start app
RUN chmod +x start.sh
CMD ["./start.sh"]
