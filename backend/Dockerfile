
FROM ruby:3.1.2

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get -y autoclean

# make working directory
RUN mkdir -p /app/backend
WORKDIR /app/backend

# copy over source
COPY ./backend /app/backend

# gems cache fix as per:
# https://stackoverflow.com/questions/66308227/could-not-find-nokogiri-1-11-1-in-any-of-the-sources-while-deploying-a-heroku-ap
RUN rm -rf vendor/cache
RUN bundle config set force_ruby_platform true

# install Ruby gems
RUN bundle install

EXPOSE 3000
