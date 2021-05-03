FROM node:fermium

RUN wget http://download.redis.io/redis-stable.tar.gz && \
    tar xvzf redis-stable.tar.gz && \
    cd redis-stable && \
    make && \
    mv src/redis-server /usr/bin/ && \
    cd .. && \
    rm -r redis-stable && \
    npm install -g concurrently

EXPOSE 6379

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#In this case, the mongodb in memory dependency is quite heavy so we avoid it for the docker image
RUN npm install --production

#By default this is the address of the mongo container. If we are deploying to heroku we will get
#a mongo_uri here direct from github secrets (check .github/worflow/radarin.yml)
ARG MONGO_URI="mongodb://mongoserver:27017/api"
ENV MONGO_URI=$MONGO_URI

# Bundle app source
# Copy every .js file on the root.
COPY api.js database.js server.js ./

CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; node /app/server.js"