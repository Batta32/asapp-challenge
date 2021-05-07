#
# Builder & Prod stage.
#
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Initialize the database
RUN apt update && apt install -y apt-transport-https ca-certificates sqlite3
RUN sqlite3 database.sqlite '.read database/ini.sql'

# Execute index file
EXPOSE 8080
CMD node lib/index.js
