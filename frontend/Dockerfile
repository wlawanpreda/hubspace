FROM node:14-slim

ENV PORT=80

WORKDIR /app
COPY . . 

RUN yarn
RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]
