
FROM node:18-buster-slim

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# confirm installation
RUN node -v
RUN npm -v
RUN yarn -v

# make working directory
RUN mkdir -p /app/frontend
WORKDIR /app/frontend

# copy over source
COPY ./frontend /app/frontend

# install node modules and build react app
RUN yarn

EXPOSE 3001
