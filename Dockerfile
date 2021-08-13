#pull official docker image for ReactJS
FROM node:14-alpine as BUILD

#set working directory
WORKDIR /webapp

#copy and run app
COPY . ./

RUN npm run heroku-postbuild
FROM BUILD as RUN
CMD export HTTPS=true && npm run start
