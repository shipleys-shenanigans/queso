
# set the base image to Debian
# https://hub.docker.com/_/debian/
FROM ruby:3.1.2

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 16.14.2

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# confirm installation
RUN source $NVM_DIR/nvm.sh \ nvm -v

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

# install yarn
RUN npm install -g yarn

# make working directory
RUN mkdir -p /app/backend
WORKDIR /app/backend

# copy over Gemfile and Gemfile.lock
COPY Gemfile /app/backend/Gemfile
COPY Gemfile.lock /app/backend/Gemfile.lock

# gems cache fix as per:
# https://stackoverflow.com/questions/66308227/could-not-find-nokogiri-1-11-1-in-any-of-the-sources-while-deploying-a-heroku-ap
RUN rm -rf vendor/cache
RUN bundle config set force_ruby_platform true

# install Ruby gems
RUN bundle install

# copy over source
COPY . /app/backend

# install node modules and build react app
RUN yarn
RUN yarn build

EXPOSE 3000
